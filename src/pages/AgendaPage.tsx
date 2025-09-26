import { FileText, Clock, Users, TrendingUp, Brain, CreditCard as Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
import { mockMeetings, mockPrepNotes, mockSalesRecords } from '../data/mockData';
import GlowButton from '../components/GlowButton';

const AgendaPage = () => {
  const [selectedMeetingId, setSelectedMeetingId] = useState('2'); // Default to upcoming meeting
  const [isEditing, setIsEditing] = useState(false);
  const [editableNotes, setEditableNotes] = useState<string[]>([]);

  const selectedMeeting = mockMeetings.find(m => m.id === selectedMeetingId);
  const prepNotes = mockPrepNotes.find(p => p.meetingId === selectedMeetingId);
  const upcomingMeetings = mockMeetings.filter(m => m.status === 'scheduled');

  const handleEditStart = () => {
    setEditableNotes([...(prepNotes?.notes || [])]);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    alert('Notes saved successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableNotes([]);
  };

  const addNote = () => {
    setEditableNotes([...editableNotes, '']);
  };

  const updateNote = (index: number, value: string) => {
    const updated = [...editableNotes];
    updated[index] = value;
    setEditableNotes(updated);
  };

  const removeNote = (index: number) => {
    setEditableNotes(editableNotes.filter((_, i) => i !== index));
  };

  const recentSalesTotal = mockSalesRecords.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meeting Agenda & Prep Notes</h1>
              <p className="text-gray-600">AI-generated content based on historical data</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedMeetingId}
              onChange={(e) => setSelectedMeetingId(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {upcomingMeetings.map(meeting => (
                <option key={meeting.id} value={meeting.id}>
                  {meeting.topic} - {new Date(meeting.date).toLocaleDateString()}
                </option>
              ))}
            </select>
            
            {!isEditing ? (
              <GlowButton
                variant="secondary"
                onClick={handleEditStart}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Notes
              </GlowButton>
            ) : (
              <div className="flex space-x-2">
                <GlowButton
                  variant="success"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </GlowButton>
                <GlowButton
                  variant="secondary"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </GlowButton>
              </div>
            )}
          </div>
        </div>

        {selectedMeeting && (
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-indigo-900">{selectedMeeting.topic}</h2>
              <div className="flex items-center space-x-4 text-sm text-indigo-700">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {selectedMeeting.participants.join(', ')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Agenda */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI-Generated Agenda */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Generated Agenda</h3>
            </div>
            
            {selectedMeeting?.agenda && (
              <div className="space-y-3">
                {selectedMeeting.agenda.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prep Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Preparation Notes</h3>
              {isEditing && (
                <GlowButton
                  size="sm"
                  onClick={addNote}
                >
                  Add Note
                </GlowButton>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                {editableNotes.map((note, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => updateNote(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter note..."
                    />
                    <button
                      onClick={() => removeNote(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : prepNotes?.notes ? (
              <div className="space-y-3">
                {prepNotes.notes.map((note, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <span className="text-gray-900">{note}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No preparation notes available for this meeting.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Topics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Key Topics</h3>
            {prepNotes?.keyTopics ? (
              <div className="space-y-2">
                {prepNotes.keyTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No key topics identified</p>
            )}
          </div>

          {/* Sales Highlights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Recent Sales Highlights</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="font-medium text-emerald-900">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-emerald-700">${(recentSalesTotal / 1000).toFixed(0)}K</p>
              </div>
              {mockSalesRecords.slice(-3).map((record, index) => (
                <div key={index} className="border-l-4 border-emerald-500 pl-3 py-2">
                  <p className="font-medium text-gray-900">{record.product}</p>
                  <p className="text-sm text-gray-600">
                    ${(record.amount / 1000).toFixed(0)}K • {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Last Meeting Summary */}
          {prepNotes?.lastMeetingSummary && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Previous Meeting Summary</h3>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{prepNotes.lastMeetingSummary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;