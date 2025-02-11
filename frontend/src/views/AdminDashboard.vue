<template>
  <section id="admin-approval" class="cyberpunk-about">
    <div class="container">
      <h2>Admin Panel</h2>
      <p>Approve or reject submitted comments below.</p>

      <div v-if="pendingComments.length > 0">
        <div v-for="comment in pendingComments" :key="comment.commentId" class="comment-card">
          <p>"{{ comment.text }}"</p>
          <p><em>- {{ comment.author }}</em></p>
          <div class="buttons">
            <button @click="approveComment(comment.commentId)">Approve</button>
            <button @click="rejectComment(comment.commentId)">Reject</button>
          </div>
        </div>
      </div>
      <p v-else>No pending comments.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/roles';

interface Comment {
  _id: string;
  commentId: string;
  text: string;
  author: string;
  approved: boolean;
}

const pendingComments = ref<Comment[]>([]);
const { getToken } = useAuthStore();

// Fetch pending comments from the API
async function fetchPendingComments() {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get('http://localhost:31415/api/comments/admin', { headers });
    console.log('Fetched comments:', response.data); // Debugging
    pendingComments.value = response.data.map(comment => ({
      ...comment,
      _id: comment._id || '',  // Ensure _id exists
      commentId: comment.commentId || ''  // Ensure commentId exists
    }));
  } catch (error) {
    console.error('Error fetching pending comments:', error);
  }
}

// Approve a comment
const approveComment = async (commentId: string) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    await axios.put(`http://localhost:31415/api/comments/${commentId}/approve`, {}, { headers });
    pendingComments.value = pendingComments.value.filter(comment => comment.commentId !== commentId);
  } catch (error) {
    console.error('Error approving comment:', error);
  }
};

// Reject a comment
const rejectComment = async (commentId: string) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`http://localhost:31415/api/comments/${commentId}`, { headers });
    pendingComments.value = pendingComments.value.filter(comment => comment.commentId !== commentId);
  } catch (error) {
    console.error('Error rejecting comment:', error);
  }
};

onMounted(fetchPendingComments);
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  position: relative;
  padding: 40px;
  margin-top: 110px;
  border: 2px solid rgba(0, 255, 255, 0.7);
  border-radius: 12px;
}

.comment-card {
  background-color: #222;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  color: white;
  border: 1px solid cyan;
}

.buttons {
  margin-top: 10px;
}

button {
  margin: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

button:first-of-type {
  background-color: #4C9F70;
  color: white;
}

button:last-of-type {
  background-color: #D9534F;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>