<template>
  <div class="h-[calc(100vh-180px)] flex gap-6 p-6">
    <!-- Contacts List -->
    <div 
      class="w-80 card shadow-lg border flex flex-col"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <!-- Search -->
      <div class="p-4 border-b" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
        <div class="relative">
          <Icon icon="line-md:search" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" :class="isDark ? 'text-gray-400' : 'text-gray-600'" />
          <input 
            type="text" 
            placeholder="Search messages..."
            class="input input-bordered w-full pl-10"
            :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
          />
        </div>
      </div>

      <!-- Contacts -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="contact in contacts" 
          :key="contact.id"
          class="p-4 border-b cursor-pointer transition-colors"
          :class="[
            isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50',
            selectedContact?.id === contact.id ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''
          ]"
          @click="selectContact(contact)"
        >
          <div class="flex items-center gap-3">
            <div class="avatar" :class="contact.online ? 'online' : 'offline'">
              <div class="w-12 rounded-full">
                <img :src="contact.avatar" :alt="contact.name" />
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h4 
                  class="font-semibold truncate"
                  :class="isDark ? 'text-white' : 'text-black'"
                >
                  {{ contact.name }}
                </h4>
                <span 
                  class="text-xs"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  {{ contact.time }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <p 
                  class="text-sm truncate"
                  :class="[
                    isDark ? 'text-gray-400' : 'text-gray-600',
                    contact.unread > 0 ? 'font-medium' : ''
                  ]"
                >
                  {{ contact.lastMessage }}
                </p>
                <span 
                  v-if="contact.unread > 0" 
                  class="badge badge-primary badge-sm"
                >
                  {{ contact.unread }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div 
      class="flex-1 card shadow-lg border flex flex-col"
      :class="isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-200'"
    >
      <div v-if="!selectedContact" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <Icon icon="line-md:email" class="h-24 w-24 mx-auto mb-4" :class="isDark ? 'text-gray-600' : 'text-gray-400'" />
          <h3 
            class="text-xl font-semibold mb-2"
            :class="isDark ? 'text-white' : 'text-black'"
          >
            Select a conversation
          </h3>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            Choose a contact to start messaging
          </p>
        </div>
      </div>

      <template v-else>
        <!-- Chat Header -->
        <div class="p-4 border-b flex items-center justify-between" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex items-center gap-3">
            <div class="avatar" :class="selectedContact.online ? 'online' : 'offline'">
              <div class="w-12 rounded-full">
                <img :src="selectedContact.avatar" :alt="selectedContact.name" />
              </div>
            </div>
            <div>
              <h3 
                class="font-semibold"
                :class="isDark ? 'text-white' : 'text-black'"
              >
                {{ selectedContact.name }}
              </h3>
              <p 
                class="text-sm"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                {{ selectedContact.online ? 'Active now' : 'Offline' }}
              </p>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm btn-circle">
              <Icon icon="line-md:phone" class="h-5 w-5" />
            </button>
            <button class="btn btn-ghost btn-sm btn-circle">
              <Icon icon="line-md:video" class="h-5 w-5" />
            </button>
            <button class="btn btn-ghost btn-sm btn-circle">
              <Icon icon="line-md:menu" class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div 
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <div 
            v-for="message in messages" 
            :key="message.id"
            class="flex"
            :class="message.isMine ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-xs lg:max-w-md"
              :class="message.isMine ? 'order-2' : 'order-1'"
            >
              <div 
                class="rounded-2xl px-4 py-2"
                :class="[
                  message.isMine 
                    ? 'bg-primary text-white rounded-br-none' 
                    : (isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black') + ' rounded-bl-none'
                ]"
              >
                <p class="break-word">{{ message.text }}</p>
              </div>
              <div 
                class="text-xs mt-1"
                :class="[
                  isDark ? 'text-gray-400' : 'text-gray-600',
                  message.isMine ? 'text-right' : 'text-left'
                ]"
              >
                {{ message.time }}
                <Icon 
                  v-if="message.isMine && message.read" 
                  icon="line-md:confirm-circle" 
                  class="inline h-3 w-3 ml-1 text-blue-500" 
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t" :class="isDark ? 'border-gray-700' : 'border-gray-200'">
          <div class="flex items-center gap-3">
            <button class="btn btn-ghost btn-sm btn-circle">
              <Icon icon="line-md:emoji-smile" class="h-5 w-5" />
            </button>
            <button class="btn btn-ghost btn-sm btn-circle">
              <Icon icon="line-md:image" class="h-5 w-5" />
            </button>
            <input 
              v-model="newMessage"
              type="text" 
              placeholder="Type a message..."
              class="input input-bordered flex-1"
              :class="isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'"
              @keypress.enter="sendMessage"
            />
            <button 
              class="btn btn-primary btn-circle"
              @click="sendMessage"
              :disabled="!newMessage.trim()"
            >
              <Icon icon="line-md:arrow-up" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, nextTick } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = inject('isDark');

const selectedContact = ref(null);
const newMessage = ref('');
const messagesContainer = ref(null);

const contacts = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff',
    lastMessage: 'Hey! How are you doing?',
    time: '2m ago',
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff',
    lastMessage: 'Can you send me the report?',
    time: '15m ago',
    unread: 1,
    online: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ec4899&color=fff',
    lastMessage: 'Thanks for your help!',
    time: '1h ago',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=f59e0b&color=fff',
    lastMessage: 'See you tomorrow 👋',
    time: '3h ago',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=10b981&color=fff',
    lastMessage: 'The project looks great!',
    time: '1d ago',
    unread: 0,
    online: true,
  },
  {
    id: 6,
    name: 'James Wilson',
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=3b82f6&color=fff',
    lastMessage: 'Let me know if you need anything',
    time: '2d ago',
    unread: 0,
    online: false,
  },
]);

const messages = ref([]);

const selectContact = (contact) => {
  selectedContact.value = contact;
  contact.unread = 0;
  
  // Load messages for this contact
  messages.value = [
    {
      id: 1,
      text: 'Hi! How are you?',
      time: '10:30 AM',
      isMine: false,
      read: true,
    },
    {
      id: 2,
      text: "Hey! I'm doing great, thanks! How about you?",
      time: '10:32 AM',
      isMine: true,
      read: true,
    },
    {
      id: 3,
      text: "I'm good too! Just working on some projects.",
      time: '10:35 AM',
      isMine: false,
      read: true,
    },
    {
      id: 4,
      text: 'That sounds interesting! What are you working on?',
      time: '10:36 AM',
      isMine: true,
      read: true,
    },
    {
      id: 5,
      text: "I'm building a new dashboard for our company. It's coming along nicely!",
      time: '10:40 AM',
      isMine: false,
      read: true,
    },
  ];

  nextTick(() => {
    scrollToBottom();
  });
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  messages.value.push({
    id: messages.value.length + 1,
    text: newMessage.value,
    time: timeString,
    isMine: true,
    read: false,
  });

  newMessage.value = '';

  nextTick(() => {
    scrollToBottom();
  });

  // Simulate reply after 2 seconds
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      text: "Thanks for your message! I'll get back to you soon.",
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isMine: false,
      read: true,
    });

    nextTick(() => {
      scrollToBottom();
    });
  }, 2000);
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>