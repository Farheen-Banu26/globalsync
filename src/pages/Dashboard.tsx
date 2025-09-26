import { Calendar, Users, Clock, TrendingUp, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { mockMeetings, mockFollowUps, mockSalesRecords } from '../data/mockData';
import GlowButton from '../components/GlowButton';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const upcomingMeetings = mockMeetings.filter(meeting => 
    meeting.status === 'scheduled' && new Date(meeting.date) >= new Date()
  );

  const pendingFollowUps = mockFollowUps.filter(followUp => 
    followUp.status === 'pending'
  );

  const recentSales = mockSalesRecords.slice(-3).reduce((sum, record) => sum + record.amount, 0);

  const completionRate = Math.round(
    (mockFollowUps.filter(f => f.status === 'completed').length / mockFollowUps.length) * 100
  );

  const getNextMeetingSlot = () => {
    const now = new Date();
    const nextSlot = new Date();
    nextSlot.setDate(now.getDate() + 2);
    nextSlot.setHours(14, 0, 0, 0);
    return nextSlot.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hi {user?.name}, here's your day at a glance
            </h1>
            <p className="text-blue-100 text-lg">
              {user?.role === 'vendor' ? 'Vendor Dashboard' : 'Distributor Dashboard'} • {user?.location}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Meeting Suggestion */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-emerald-900 mb-1">
              Next Suggested Meeting Slot
            </h3>
            <p className="text-emerald-700 mb-3">
              AI recommends: <strong>{getNextMeetingSlot()}</strong>
            </p>
            <GlowButton
              variant="success"
              size="sm"
              onClick={() => navigate('/schedule')}
            >
              Schedule Now
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Upcoming Meetings</h3>
          <p className="text-sm text-gray-600">Next 30 days</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{pendingFollowUps.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Pending Follow-ups</h3>
          <p className="text-sm text-gray-600">Action required</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${(recentSales / 1000).toFixed(0)}K</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Recent Sales</h3>
          <p className="text-sm text-gray-600">Last 3 deals</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Completion Rate</h3>
          <p className="text-sm text-gray-600">Follow-ups completed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlowButton
            onClick={() => navigate('/schedule')}
            className="w-full flex flex-col items-center space-y-2 py-6"
          >
            <Plus className="h-6 w-6" />
            <span>Schedule Meeting</span>
          </GlowButton>
          
          <GlowButton
            variant="secondary"
            onClick={() => navigate('/agenda')}
            className="w-full flex flex-col items-center space-y-2 py-6"
          >
            <Users className="h-6 w-6" />
            <span>View Agenda</span>
          </GlowButton>
          
          <GlowButton
            variant="warning"
            onClick={() => navigate('/followups')}
            className="w-full flex flex-col items-center space-y-2 py-6"
          >
            <Clock className="h-6 w-6" />
            <span>Follow-ups</span>
          </GlowButton>
          
          <GlowButton
            variant="success"
            onClick={() => navigate('/past-meetings')}
            className="w-full flex flex-col items-center space-y-2 py-6"
          >
            <Calendar className="h-6 w-6" />
            <span>Past Meetings</span>
          </GlowButton>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Meetings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meetings</h3>
          {upcomingMeetings.length > 0 ? (
            <div className="space-y-3">
              {upcomingMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{meeting.topic}</p>
                    <p className="text-sm text-gray-600">{meeting.time} • {meeting.participants.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No meetings scheduled for today</p>
            </div>
          )}
        </div>

        {/* Pending Follow-ups */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Follow-ups</h3>
          {pendingFollowUps.length > 0 ? (
            <div className="space-y-3">
              {pendingFollowUps.slice(0, 3).map((followUp) => (
                <div key={followUp.id} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{followUp.task}</p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(followUp.dueDate).toLocaleDateString()} • 
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        followUp.priority === 'high' ? 'bg-red-100 text-red-800' :
                        followUp.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {followUp.priority} priority
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-gray-500">All follow-ups completed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;