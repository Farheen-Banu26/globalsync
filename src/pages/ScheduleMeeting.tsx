import { useState } from 'react';
import { Calendar, Clock, Users, Brain, Check, AlertCircle, Globe } from 'lucide-react';
import { mockCalendarSlots, mockUsers } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import GlowButton from '../components/GlowButton';

const ScheduleMeeting = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    participants: [] as string[],
    autoAgenda: true,
    vendorSlots: [] as string[],
    distributorSlots: [] as string[]
  });
  const [aiResult, setAiResult] = useState<{
    success: boolean;
    slot?: string;
    message: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleParticipantToggle = (participantId: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.includes(participantId)
        ? prev.participants.filter(id => id !== participantId)
        : [...prev.participants, participantId]
    }));
  };

  const handleSlotChange = (role: 'vendor' | 'distributor', slot: string, checked: boolean) => {
    const key = role === 'vendor' ? 'vendorSlots' : 'distributorSlots';
    setFormData(prev => ({
      ...prev,
      [key]: checked 
        ? [...prev[key], slot]
        : prev[key].filter(s => s !== slot)
    }));
  };

  const analyzeSlots = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Find overlapping slots
    const overlapping = formData.vendorSlots.filter(slot => 
      formData.distributorSlots.includes(slot)
    );

    if (overlapping.length > 0) {
      // Select the best slot (earliest available)
      const bestSlot = overlapping.sort()[0];
      setAiResult({
        success: true,
        slot: bestSlot,
        message: `Perfect! AI found ${overlapping.length} overlapping slots. Recommended: ${bestSlot} (optimized for both time zones)`
      });
    } else {
      setAiResult({
        success: false,
        message: 'No overlapping slots found. Please select more time slots or choose different dates.'
      });
    }
    
    setIsAnalyzing(false);
  };

  const scheduleMeeting = () => {
    if (aiResult?.success && aiResult.slot) {
      // In a real app, this would save to the backend
      alert(`Meeting "${formData.topic}" scheduled for ${formData.date} at ${aiResult.slot}!`);
      setFormData({
        topic: '',
        date: '',
        participants: [],
        autoAgenda: true,
        vendorSlots: [],
        distributorSlots: []
      });
      setAiResult(null);
    }
  };

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI-Assisted Scheduling</h1>
            <p className="text-gray-600">Let our AI find the perfect meeting time across time zones</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Meeting Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Topic
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Q1 Strategy Review"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Participants Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Participants
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {mockUsers.map(participant => (
                <div
                  key={participant.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.participants.includes(participant.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleParticipantToggle(participant.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      participant.role === 'vendor' ? 'bg-blue-100' : 'bg-emerald-100'
                    }`}>
                      <Users className={`h-5 w-5 ${
                        participant.role === 'vendor' ? 'text-blue-600' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {participant.location} • {participant.role}
                      </p>
                    </div>
                    {formData.participants.includes(participant.id) && (
                      <Check className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Zone Slots */}
          {formData.participants.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Vendor Slots */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Vendor Available Slots</h3>
                  <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                    Chennai (IST)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.vendorSlots.includes(slot)}
                        onChange={(e) => handleSlotChange('vendor', slot, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distributor Slots */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-900">Distributor Available Slots</h3>
                  <span className="text-xs px-2 py-1 bg-emerald-200 text-emerald-800 rounded-full">
                    Berlin (CET)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.distributorSlots.includes(slot)}
                        onChange={(e) => handleSlotChange('distributor', slot, e.target.checked)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Auto-generate Agenda Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoAgenda"
              checked={formData.autoAgenda}
              onChange={(e) => setFormData(prev => ({ ...prev, autoAgenda: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoAgenda" className="text-sm text-gray-700">
              Auto-generate agenda based on past meetings and sales data
            </label>
          </div>

          {/* AI Analysis Button */}
          {formData.vendorSlots.length > 0 && formData.distributorSlots.length > 0 && (
            <div className="border-t pt-6">
              <GlowButton
                onClick={analyzeSlots}
                loading={isAnalyzing}
                disabled={isAnalyzing}
                className="w-full"
                size="lg"
              >
                <Brain className="h-5 w-5 mr-2" />
                {isAnalyzing ? 'AI is analyzing optimal slots...' : 'Find Optimal Meeting Time'}
              </GlowButton>
            </div>
          )}
        </div>
      </div>

      {/* AI Results */}
      {aiResult && (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
          aiResult.success ? 'border-emerald-200' : 'border-red-200'
        }`}>
          <div className="flex items-start space-x-3">
            {aiResult.success ? (
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex-1">
              <h3 className={`font-semibold ${aiResult.success ? 'text-emerald-900' : 'text-red-900'}`}>
                {aiResult.success ? 'Optimal Slot Found!' : 'No Match Found'}
              </h3>
              <p className={`mt-1 ${aiResult.success ? 'text-emerald-700' : 'text-red-700'}`}>
                {aiResult.message}
              </p>
              {aiResult.success && aiResult.slot && (
                <div className="mt-4">
                  <GlowButton
                    variant="success"
                    onClick={scheduleMeeting}
                    disabled={!formData.topic || !formData.date}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </GlowButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;