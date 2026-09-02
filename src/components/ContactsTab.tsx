import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  UserPlus, 
  Star, 
  X,
  Check
} from 'lucide-react';
import { ContactItem } from '../types';
import { currentUser } from '../data/mockData';

interface ContactsTabProps {
  contacts: ContactItem[];
  onOpenChatWithUser?: (userName: string) => void;
  onNavigateToProfile?: () => void;
}

export const ContactsTab: React.FC<ContactsTabProps> = ({
  contacts,
  onOpenChatWithUser,
  onNavigateToProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [callNotice, setCallNotice] = useState<string | null>(null);
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
  const [contactList, setContactList] = useState<ContactItem[]>(contacts);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRole, setNewContactRole] = useState('');

  const filterTabs = ['All', 'Favorites', 'Corporate', 'Engineering', 'Design', 'Operations'];

  const filteredContacts = contactList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Favorites') return c.isFavorite;
    return c.category === selectedFilter;
  });

  const frequentContacts = filteredContacts.filter((c) => c.isFrequent);
  const directoryContacts = filteredContacts.filter((c) => !c.isFrequent);

  // Group directory contacts by first letter
  const groupedContacts = directoryContacts.reduce((acc, contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, ContactItem[]>);

  const sortedLetters = Object.keys(groupedContacts).sort();

  const handleCall = (contact: ContactItem) => {
    setCallNotice(`Calling ${contact.name} (${contact.phone || '+1 555-0192'})...`);
    setTimeout(() => setCallNotice(null), 3000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim()) return;

    const initials = newContactName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const created: ContactItem = {
      id: `contact-${Date.now()}`,
      name: newContactName.trim(),
      role: newContactRole.trim() || 'Team Member',
      initials,
      department: 'Enterprise Team',
      category: 'Corporate',
      phone: '+1 (555) 888-9999',
      email: `${newContactName.toLowerCase().replace(' ', '.')}@synergy.io`
    };

    setContactList(prev => [created, ...prev]);
    setNewContactName('');
    setNewContactRole('');
    setAddContactModalOpen(false);
  };

  return (
    <div className="relative min-h-full pb-20 bg-[#F0F2F5]">
      {/* Active Call Simulated Notification */}
      {callNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Phone className="h-4 w-4 text-emerald-400 animate-bounce" />
          <span>{callNotice}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#0068FF] px-4 py-3 shadow-sm text-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateToProfile}
            className="group relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/50 transition hover:ring-white"
          >
            <img src={currentUser.avatar} alt="Alex" className="h-full w-full object-cover" />
          </button>
          <span className="text-xl font-bold tracking-tight text-white">Danh bạ</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setAddContactModalOpen(true)}
            className="p-2 bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition text-white"
            title="Thêm liên hệ"
          >
            <UserPlus className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-[#0068FF]/5">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 shadow-xs">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            id="contacts-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm danh bạ đồng nghiệp..."
            className="w-full bg-transparent text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab;
          return (
            <button
              key={tab}
              id={`contact-filter-${tab.toLowerCase()}`}
              onClick={() => setSelectedFilter(tab)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? 'bg-[#0068FF] text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* FREQUENT CONTACTS Section */}
      {frequentContacts.length > 0 && (
        <section className="px-4 pt-2">
          <div className="mb-2 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
            Liên hệ thường xuyên
          </div>

          <div className="space-y-2.5">
            {frequentContacts.map((contact) => (
              <div
                key={contact.id}
                id={`frequent-contact-${contact.id}`}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-gray-100"
                    />
                    {contact.isFavorite && (
                      <span className="absolute -top-1 -left-1 rounded-full bg-amber-400 p-0.5 text-white shadow-2xs">
                        <Star className="h-2.5 w-2.5 fill-white" />
                      </span>
                    )}
                    {contact.status === 'online' && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A] leading-tight">
                      {contact.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{contact.role}</p>
                  </div>
                </div>

                {/* Call & Chat buttons */}
                <div className="flex items-center gap-2">
                  <button
                    id={`call-btn-${contact.id}`}
                    onClick={() => handleCall(contact)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#0068FF] hover:bg-blue-100 transition"
                    title={`Gọi cho ${contact.name}`}
                  >
                    <Phone className="h-4 w-4" />
                  </button>

                  <button
                    id={`message-btn-${contact.id}`}
                    onClick={() => {
                      if (onOpenChatWithUser) onOpenChatWithUser(contact.name);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#0068FF] hover:bg-blue-100 transition"
                    title={`Nhắn tin cho ${contact.name}`}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ALL DIRECTORY Section (A-Z) */}
      <section className="px-4 pt-4">
        <div className="mb-2 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
          Tất cả danh bạ (A-Z)
        </div>

        <div className="space-y-3">
          {sortedLetters.map((letter) => (
            <div key={letter}>
              <div className="py-1 text-xs font-bold text-[#0068FF]">
                {letter}
              </div>

              <div className="divide-y divide-gray-50 rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                {groupedContacts[letter].map((contact) => (
                  <div
                    key={contact.id}
                    id={`directory-contact-${contact.id}`}
                    onClick={() => {
                      if (onOpenChatWithUser) onOpenChatWithUser(contact.name);
                    }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      {contact.avatar ? (
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-100"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-xs text-[#0068FF]">
                          {contact.initials || 'AB'}
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A] leading-tight">
                          {contact.name}
                        </h4>
                        <p className="text-[10.5px] text-gray-500 mt-0.5">{contact.role}</p>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button (User+) */}
      <button
        id="fab-add-contact-btn"
        onClick={() => setAddContactModalOpen(true)}
        className="fixed bottom-20 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:scale-105 active:scale-95 transition"
        title="Thêm danh bạ mới"
      >
        <UserPlus className="h-5 w-5" />
      </button>

      {/* Add Contact Modal */}
      {addContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1A1A1A]">Thêm liên hệ mới</h3>
              <button
                onClick={() => setAddContactModalOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="VD: Rachel Sterling"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#0068FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 uppercase">Chức vụ / Phòng ban</label>
                <input
                  type="text"
                  required
                  value={newContactRole}
                  onChange={(e) => setNewContactRole(e.target.value)}
                  placeholder="VD: Giám đốc sản phẩm"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#0068FF]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAddContactModalOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#0068FF] py-2.5 text-xs font-bold text-white hover:bg-blue-600 shadow-xs"
                >
                  Lưu liên hệ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
