<template>
    <div>
      <h1>Token 机制测试</h1>
      <div>
        <h2>获取用户信息</h2>
        <button @click="handleGetUserInfo(100000)">获取信息</button>
        <pre>{{ userInfo }}</pre>
      </div>
    </div>
  </template>
  
  <script setup lang="ts" name="Test">
  import { ref } from 'vue';
  import { getUserInfo } from '../api/httpClient';  
  
  const userInfo = ref(null);
  
  const handleGetUserInfo = async (id: number) => {
    const token = localStorage.getItem('token');
    console.log("token:",token);
    const refresh_token = localStorage.getItem('refresh_token');
    console.log("refresh_token:",refresh_token);

    
    try {
      const response = await getUserInfo(id);  
      if (response.data.code === 0) {
        userInfo.value = response.data.data;
      } else {
        console.log('获取用户信息失败: ' + response.data.msg);
      }
    } catch (error) {
      console.error('获取用户信息错误:', error);
    }
  };
  </script>
  
  <style scoped>
  h1, h2 {
    margin-bottom: 10px;
  }
  input {
    display: block;
    margin-bottom: 10px;
  }
  button {
    margin-bottom: 20px;
  }
  </style>