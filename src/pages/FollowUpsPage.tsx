import { useState } from 'react';
import { Clock, CheckCircle, Plus, AlertTriangle, Trophy, Target } from 'lucide-react';
import { mockFollowUps } from '../data/mockData';
import { FollowUp } from '../types';
import GlowButton from '../components/GlowButton';

const FollowUpsPage = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    task: '',
    assignee: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const completionRate = Math.round(
    (followUps.filter(f => f.status === 'completed').length / followUps.length) * 100
  );

  const toggleStatus = (id: string) => {
    setFollowUps(prev => prev.map(followUp =>
      followUp.id === id
        ? { ...followUp, status: followUp.status === 'pending' ? 'completed' : 'pending' }
        : followUp
    ));
  };

  const handleAddFollowUp = () => {
    if (newFollowUp.task && newFollowUp.assignee && newFollowUp.dueDate) {
      const followUp: FollowUp = {
        id: Date.now().toString(),
        meetingId: '1',
        task: newFollowUp.task,
        assignee: newFollowUp.assignee,
        dueDate: newFollowUp.dueDate,
        status: 'pending',
        priority: newFollowUp.priority
      };
      
      setFollowUps(prev => [...prev, followUp]);
      setNewFollowUp({ task: '', assignee: '', dueDate: '', priority: 'medium' });
      setShowAddForm(false);
    }
  };

  const pendingFollowUps = followUps.filter(f => f.status === 'pending');
  const completedFollowUps = followUps.filter(f => f.status === 'completed');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGamificationLevel = () => {
    if (completionRate >= 90) return { level: 'Expert', color: 'text-purple-600', icon: Trophy };
    if (completionRate >= 70) return { level: 'Pro', color: 'text-emerald-600', icon: Target };
    if (completionRate >= 50) return { level: 'Growing', color: 'text-blue-600', icon: CheckCircle };
    return { level: 'Starter', color: 'text-gray-600', icon: Clock };
  };

  const gamification = getGamificationLevel();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Stats */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Follow-ups & Reminders</h1>
              <p className="text-gray-600">Track and manage your action items</p>
            </div>
          </div>

          <GlowButton
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Follow-up
          </GlowButton>
        </div>

        {/* Gamification Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Completion Rate</span>
              <gamification.icon className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold mb-1">{completionRate}%</div>
            <div className="text-blue-100 text-sm">{gamification.level} Level</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pending Tasks</span>
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{pendingFollowUps.length}</div>
            <div className="text-gray-500 text-sm">Need attention</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed</span>
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{completedFollowUps.length}</div>
            <div className="text-gray-500 text-sm">This month</div>
          </div>
        </div>
      </div>

      {/* Add Follow-up Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Follow-up</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Description</label>
              <input
                type="text"
                value={newFollowUp.task}
                onChange={(e) => setNewFollowUp(prev => ({ ...prev, task: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
              <input
                type="text"
                value={newFollowUp.assignee}
                onChange={(e) => setNewFollowUp(prev => ({ ...prev, assignee: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Assignee name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={newFollowUp.dueDate}
                onChange={(e) => setNewFollowUp(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newFollowUp.priority}
                onChange={(e) => setNewFollowUp(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <GlowButton onClick={handleAddFollowUp}>
              Add Follow-up
            </GlowButton>
            <GlowButton 
              variant="secondary" 
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </GlowButton>
          </div>
        </div>
      )}

      {/* Follow-ups List */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Pending Follow-ups */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 text-amber-500 mr-2" />
            Pending ({pendingFollowUps.length})
          </h3>
          
          <div className="space-y-3">
            {pendingFollowUps.map(followUp => (
              <div
                key={followUp.id}
                className="bg-amber-50 border border-amber-200 rounded-lg p-4 hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleStatus(followUp.id)}
                    className="w-5 h-5 border-2 border-amber-400 rounded mt-0.5 hover:bg-amber-400 transition-colors"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{followUp.task}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>Assignee: {followUp.assignee}</span>
                      <span>Due: {new Date(followUp.dueDate).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(followUp.priority)}`}>
                        {followUp.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingFollowUps.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-emerald-300 mx-auto mb-3" />
                <p className="text-gray-500">All follow-ups completed! 🎉</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Follow-ups */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
            Completed ({completedFollowUps.length})
          </h3>
          
          <div className="space-y-3">
            {completedFollowUps.map(followUp => (
              <div
                key={followUp.id}
                className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 opacity-75"
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleStatus(followUp.id)}
                    className="w-5 h-5 bg-emerald-500 border-2 border-emerald-500 rounded mt-0.5 flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  >
                    <CheckCircle className="h-3 w-3 text-white" />
                  </button>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-through">{followUp.task}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span>Completed by: {followUp.assignee}</span>
                      <span>Due: {new Date(followUp.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {completedFollowUps.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No completed follow-ups yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsPage;