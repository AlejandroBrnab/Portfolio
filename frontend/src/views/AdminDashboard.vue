<template>
  <section id="admin-approval" class="cyberpunk-about">
    <div class="container">
      <h2>Admin Panel</h2>
      <p>Approve, reject, or delete submitted comments below.</p>

      <div v-if="pendingComments.length > 0">
        <h3>Pending Comments</h3>
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

      <div v-if="allComments.length > 0">
        <h3>All Comments</h3>
        <div v-for="comment in allComments" :key="comment.commentId" class="comment-card">
          <p>"{{ comment.text }}"</p>
          <p><em>- {{ comment.author }}</em></p>
          <div class="buttons">
            <button v-if="!comment.approved" @click="approveComment(comment.commentId)">Approve</button>
            <button v-if="!comment.approved" @click="rejectComment(comment.commentId)">Reject</button>
            <button @click="deleteComment(comment.commentId)">Delete</button>
          </div>
        </div>
      </div>
      <p v-else>No comments available.</p>
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
const allComments = ref<Comment[]>([]);
const { getToken } = useAuthStore();

async function fetchPendingComments() {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/admin`, { headers });
    console.log('Fetched pending comments:', response.data);
    pendingComments.value = response.data.filter((comment: Comment) => !comment.approved).map((comment: Comment) => ({
      ...comment,
      _id: comment._id || '',  
      commentId: comment.commentId || '' 
    }));
  } catch (error) {
    console.error('Error fetching pending comments:', error);
  }
}

async function fetchAllComments() {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/admin`, { headers });
    console.log('Fetched all comments:', response.data); 
    allComments.value = response.data.map((comment: Comment) => ({
      ...comment,
      _id: comment._id || '',  
      commentId: comment.commentId || ''  
    }));
  } catch (error) {
    console.error('Error fetching all comments:', error);
  }
}

const approveComment = async (commentId: string) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    await axios.put(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}/approve`, {}, { headers });
    pendingComments.value = pendingComments.value.filter(comment => comment.commentId !== commentId);
    const comment = allComments.value.find(comment => comment.commentId === commentId);
    if (comment) {
      comment.approved = true;
    }
  } catch (error) {
    console.error('Error approving comment:', error);
  }
};

const rejectComment = async (commentId: string) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`, { headers });
    pendingComments.value = pendingComments.value.filter(comment => comment.commentId !== commentId);
    allComments.value = allComments.value.filter(comment => comment.commentId !== commentId);
  } catch (error) {
    console.error('Error rejecting comment:', error);
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`, { headers });
    pendingComments.value = pendingComments.value.filter(comment => comment.commentId !== commentId);
    allComments.value = allComments.value.filter(comment => comment.commentId !== commentId);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

onMounted(() => {
  fetchPendingComments();
  fetchAllComments();
});
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  text-align: center;
  max-width: 800px;
  padding: 40px;
  margin: 100px auto 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  margin-top: 130px;
}

h2, h3 {
  font-size: 2rem;
  color: #1098F7;
  font-weight: 600;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

h3 {
  font-size: 1.5rem;
  margin-top: 30px;
}

.comment-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin: 15px auto;
  max-width: 600px;
}

.comment-card p {
  font-size: 1rem;
  color: #fff;
}

.comment-card em {
  color: #8EA4D2;
  font-style: italic;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  background: linear-gradient(90deg, #1098F7, #4C9F70);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
}

button:active {
  transform: translateY(1px);
}

button:first-of-type {
  background: linear-gradient(90deg, #4C9F70, #2E7D32);
}

button:nth-of-type(2) {
  background: linear-gradient(90deg, #D9534F, #B71C1C);
}

button:last-of-type {
  background: linear-gradient(90deg, #FF6347, #D84315);
}

p {
  font-size: 1rem;
  color: #8EA4D2;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    max-width: 90%;
  }

  h2, h3 {
    font-size: 1.5rem;
  }

  .comment-card {
    padding: 15px;
  }

  button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}
</style>