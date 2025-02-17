<template>
  <section id="admin-approval" class="cyberpunk-about">
    <div class="container">
      <h2>{{ t('admin.panel') }}</h2>
      <p>{{ t('admin.approve_reject_delete') }}</p>

      <div v-if="pendingComments.length > 0">
        <h3>{{ t('admin.pending_comments') }}</h3>
        <div v-for="comment in pendingComments" :key="comment.commentId" class="comment-card">
          <p>"{{ comment.text }}"</p>
          <p><em>- {{ comment.author }}</em></p>
          <div class="buttons">
            <button @click="approveComment(comment.commentId)">{{ t('admin.approve') }}</button>
            <button @click="rejectComment(comment.commentId)">{{ t('admin.reject') }}</button>
          </div>
        </div>
      </div>
      <p v-else>{{ t('admin.no_pending_comments') }}</p>

      <div v-if="allComments.length > 0">
        <h3>{{ t('admin.all_comments') }}</h3>
        <div v-for="comment in allComments" :key="comment.commentId" class="comment-card">
          <p>"{{ comment.text }}"</p>
          <p><em>- {{ comment.author }}</em></p>
          <div class="buttons">
            <button v-if="!comment.approved" @click="approveComment(comment.commentId)">{{ t('admin.approve') }}</button>
            <button v-if="!comment.approved" @click="rejectComment(comment.commentId)">{{ t('admin.reject') }}</button>
            <button @click="deleteComment(comment.commentId)">{{ t('admin.delete') }}</button>
          </div>
        </div>
      </div>
      <p v-else>{{ t('admin.no_comments_available') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/roles';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

// Fetch pending comments from the API
async function fetchPendingComments() {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/admin`, { headers });
    console.log('Fetched pending comments:', response.data); // Debugging
    pendingComments.value = response.data.filter((comment: Comment) => !comment.approved).map((comment: Comment) => ({
      ...comment,
      _id: comment._id || '',  // Ensure _id exists
      commentId: comment.commentId || ''  // Ensure commentId exists
    }));
  } catch (error) {
    console.error('Error fetching pending comments:', error);
  }
}

// Fetch all comments from the API
async function fetchAllComments() {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/admin`, { headers });
    console.log('Fetched all comments:', response.data); // Debugging
    allComments.value = response.data.map((comment: Comment) => ({
      ...comment,
      _id: comment._id || '',  // Ensure _id exists
      commentId: comment.commentId || ''  // Ensure commentId exists
    }));
  } catch (error) {
    console.error('Error fetching all comments:', error);
  }
}

// Approve a comment
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

// Reject a comment
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

// Delete a comment
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
/* General Reset */
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

/* Comment Cards */
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

/* Buttons */
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

/* Different Button Colors */
button:first-of-type {
  background: linear-gradient(90deg, #4C9F70, #2E7D32);
}

button:nth-of-type(2) {
  background: linear-gradient(90deg, #D9534F, #B71C1C);
}

button:last-of-type {
  background: linear-gradient(90deg, #FF6347, #D84315);
}

/* Empty State */
p {
  font-size: 1rem;
  color: #8EA4D2;
  margin-top: 20px;
}

/* Responsive */
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
