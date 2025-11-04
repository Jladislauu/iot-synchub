<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-gray-900">IoT SyncHub</h1>
          <button @click="logout" class="text-red-600 hover:text-red-800 font-medium">
            Sair
          </button>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

const router = useRouter()

const logout = () => {
  authService.removeToken()
  router.push('/login')
}
</script>