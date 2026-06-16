<script>
export default {
  data() {
    return { cui: '' }
  },
  methods: {
    buscar() {
      if (this.cui.trim()) {
        this.$router.push('/constancia/' + this.cui.trim())
      }
    }
  }
}
</script>

<template>
  <div class="page">
    <div class="home-card">
      <div class="seal">UNSA</div>
      <h1>UNIVERSIDAD NACIONAL DE SAN AGUSTÍN</h1>
      <p class="sub">Sistema de Constancias de Matrícula</p>
      <div class="divider"></div>
      <form @submit.prevent="buscar">
        <label for="cui">Ingrese su CUI</label>
        <input
          id="cui"
          v-model.trim="cui"
          type="text"
          placeholder="Ej: 12345678"
          maxlength="12"
          autofocus
        />
        <button type="submit" :disabled="!cui">Consultar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f2, #f5e0e0, #fdf2f2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.home-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(107, 15, 26, 0.12);
  padding: 48px 40px;
  border: 2px solid #c5a059;
  text-align: center;
  max-width: 420px;
  width: 100%;
}

.seal {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B0F1A, #8B1A2B);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  margin: 0 auto 16px;
}

h1 {
  font-size: 15px;
  font-weight: 800;
  color: #6B0F1A;
  margin: 0 0 4px;
}

.sub {
  font-size: 13px;
  color: #A83240;
  margin: 0 0 20px;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: #f0d0d0;
  margin-bottom: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 11px;
  font-weight: 600;
  color: #8B1A2B;
  text-transform: uppercase;
  text-align: left;
}

input {
  padding: 10px 14px;
  border: 2px solid #f0d0d0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  font-family: monospace;
  text-align: center;
  letter-spacing: 2px;
}

input:focus {
  border-color: #8B1A2B;
}

button {
  margin-top: 4px;
  padding: 10px;
  background: #6B0F1A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  text-transform: uppercase;
}

button:hover:not(:disabled) {
  background: #8B1A2B;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
