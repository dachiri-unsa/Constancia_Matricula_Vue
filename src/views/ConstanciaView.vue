<script>
import axios from 'axios'

export default {
  data() {
    return {
      constancia: null,
      error: null
    }
  },

  created() {
    const cui = this.$route.params.cui
    const source = axios.CancelToken.source()
    const timeoutId = setTimeout(() => source.cancel('La solicitud tardó demasiado'), 20000)

    axios.get(
      'https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=' + cui,
      { cancelToken: source.token }
    ).then(response => {
      this.constancia = response.data
    }).catch(e => {
      if (axios.isCancel(e)) {
        this.error = 'La solicitud está demorando demasiado. Intente nuevamente.'
      } else if (e.response) {
        this.error = 'Error del servidor (' + e.response.status + '). Verifique el CUI ingresado.'
      } else if (e.request) {
        this.error = 'No se pudo conectar con el servidor. Verifique su conexión.'
      } else {
        this.error = 'Error al cargar la constancia. Verifique el CUI ingresado.'
      }
    }).finally(() => {
      clearTimeout(timeoutId)
    })
  },

  methods: {
    formatDate(str) {
      if (!str) return '—'
      return new Date(str).toLocaleDateString('es-PE', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
  }
}
</script>

<template>
  <div class="page">
    <div v-if="error" class="card">
      <div class="error-icon">!</div>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="constancia" class="certificate">
      <div class="header">
        <div class="header-top">
          <div class="seal">UNSA</div>
          <div>
            <h1>UNIVERSIDAD NACIONAL DE SAN AGUSTÍN</h1>
            <p class="subtitle">Dirección de Sistemas de Información Académica</p>
          </div>
        </div>
        <h2 class="cert-title">CONSTANCIA DE MATRÍCULA</h2>
      </div>

      <div v-if="constancia.results.length">
        <div class="info-box flex-wrap">
          <div class="field">
            <span class="label">CUI</span>
            <span class="val mono">{{ constancia.results[0].student.cui }}</span>
          </div>
          <div class="field">
            <span class="label">Nombre</span>
            <span class="val">{{ constancia.results[0].student.full_name }}</span>
          </div>
          <div class="field">
            <span class="label">Correo</span>
            <span class="val">{{ constancia.results[0].student.email }}</span>
          </div>
        </div>

        <div class="badge-wrap">
          <span class="badge">Cursos matriculados: <strong>{{ constancia.count }}</strong></span>
        </div>

        <div class="table">
          <div class="th">
            <span>N°</span><span>Código</span><span>Curso</span>
            <span>Créd</span><span>Grupo</span><span>Lab</span><span>Docente</span>
          </div>
          <div v-for="(item, i) in constancia.results" :key="item.id" class="tr">
            <span>{{ i + 1 }}</span>
            <span class="mono">{{ item.workload.course.code }}</span>
            <span class="course-cell">
              <strong>{{ item.workload.course.name }}</strong>
              <small class="acr">{{ item.workload.course.acronym }}</small>
            </span>
            <span>{{ item.workload.course.credits }}</span>
            <span>{{ item.workload.group }}</span>
            <span>{{ item.workload.laboratory }}</span>
            <span>{{ item.workload.teacher.full_name }}</span>
          </div>
        </div>

        <div class="divider"></div>
        <p class="footer-text">Desarrollado por Daniel Cooper Achiri Cuevas</p>
      </div>

      <p v-else class="empty-msg">
        No se encontraron registros para el CUI ingresado.
      </p>
    </div>

    <div v-else class="card">
      <div class="spinner"></div>
      <p>Cargando constancia...</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f2, #f5e0e0, #fdf2f2);
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.card, .certificate {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(107, 15, 26, 0.1);
}

.card {
  max-width: 500px;
  margin: 80px auto;
  padding: 48px 32px;
  text-align: center;
}

.card p {
  color: #8B1A2B;
  font-size: 15px;
  margin: 16px 0 0;
}

.certificate {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 48px;
  border: 2px solid #c5a059;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #c5a059;
}

.seal {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6B0F1A, #8B1A2B);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

h1 {
  font-size: 14px;
  font-weight: 800;
  color: #6B0F1A;
  margin: 0;
}

.subtitle {
  font-size: 11px;
  color: #A83240;
  margin: 2px 0 0;
  font-weight: 500;
}

.cert-title {
  font-size: 19px;
  font-weight: 800;
  color: #6B0F1A;
  margin: 0;
  text-transform: uppercase;
}

.info-box {
  background: #fdf2f3;
  border-radius: 8px;
  padding: 14px 20px;
  border: 1px solid #f0d0d0;
  margin-bottom: 18px;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 40px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.field .label {
  font-size: 10px;
  font-weight: 600;
  color: #8B1A2B;
  text-transform: uppercase;
}

.field .val {
  font-size: 14px;
  color: #212121;
  font-weight: 600;
}

.badge-wrap {
  text-align: center;
  margin-bottom: 14px;
}

.badge {
  display: inline-block;
  background: #fdf2f3;
  color: #6B0F1A;
  padding: 4px 20px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid #f0d0d0;
}

.mono {
  font-family: monospace;
  color: #6B0F1A;
  font-weight: 600;
}

.course-cell {
  flex-direction: column;
  align-items: flex-start;
}

.acr {
  color: #8B1A2B;
}

.table {
  border: 1px solid #f0d0d0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;
}

.th, .tr {
  display: grid;
  grid-template-columns: 32px 76px 1fr 42px 56px 46px 1fr;
}

.th {
  background: #6B0F1A;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.th span, .tr span {
  padding: 9px 6px;
  display: flex;
  align-items: center;
}

.tr {
  font-size: 13px;
  border-top: 1px solid #f5e0e0;
}

.tr:nth-child(even) {
  background: #fefafb;
}

.th span:nth-child(1),
.th span:nth-child(4),
.th span:nth-child(5),
.th span:nth-child(6),
.tr span:nth-child(1),
.tr span:nth-child(4),
.tr span:nth-child(5),
.tr span:nth-child(6) {
  justify-content: center;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid #f5e0e0;
  border-top: 4px solid #6B0F1A;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fdf2f2;
  color: #6B0F1A;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.divider {
  height: 1px;
  background: #f0d0d0;
  margin: 18px 0 12px;
}

.footer-text {
  text-align: center;
  font-size: 11px;
  color: #8B1A2B;
  margin: 0;
}

.empty-msg {
  text-align: center;
  padding: 40px 0;
  color: #888;
  font-size: 14px;
}

@media (max-width: 768px) {
  .page { padding: 16px 8px; }
  .certificate { padding: 16px; }
  .cert-title { font-size: 16px; }
  .header-top { flex-direction: column; gap: 10px; }
  .info-box { padding: 12px 14px; }
  .flex-wrap { flex-direction: column; gap: 10px; }
  .table { overflow-x: auto; }
  .th, .tr { grid-template-columns: 28px 66px 1fr 38px 48px 42px 1fr; font-size: 11px; }
  .th span, .tr span { padding: 7px 4px; }
}

@media print {
  .page { background: #fff; padding: 0; }
  .certificate { box-shadow: none; border-color: #000; }
  .tr { break-inside: avoid; }
}
</style>
