//DOM
const form = document.getElementById('form-presupuesto');
const inputNombre = document.getElementById('nombre');
const inputApels = document.getElementById('apellidos');
const inputTel = document.getElementById('telefono');
const inputEmail = document.getElementById('email');
const selectProd = document.getElementById('producto');
const inputPlazo = document.getElementById('plazo');
const checkExtras = document.querySelectorAll('.extra');
const totalEl = document.getElementById('presupuesto-final');
const desglosEl = document.getElementById('resumen-desglose');
const descBadge = document.getElementById('descuento-badge');
const labelCond = document.getElementById('label-condiciones');
const checkCond = document.getElementById('condiciones');
const errCond = document.getElementById('error-condiciones');
const modalOverlay = document.getElementById('modal-overlay');
const modalCerrar = document.getElementById('modal-cerrar');

// ── VALIDACIONES

const REGLAS = {
    nombre: {
        regex: /^[a-zA-ZÀ-ÿ\s]+$/,
        maxLen: 15,
        msgs: {
            vacio: 'El nombre es obligatorio.',
            letras: 'El nombre solo puede contener letras.',
            largo: 'El nombre no puede superar los 15 caracteres.'
        }
    },
    apellidos: {
        regex: /^[a-zA-ZÀ-ÿ\s]+$/,
        maxLen: 40,
        msgs: {
            vacio: 'Los apellidos son obligatorios.',
            letras: 'Los apellidos solo pueden contener letras.',
            largo: 'Los apellidos no pueden superar los 40 caracteres.'
        }
    },
    telefono: {
        regex: /^[0-9]+$/,
        maxLen: 9,
        msgs: {
            vacio: 'El teléfono es obligatorio.',
            numeros: 'El teléfono solo puede contener números.',
            largo: 'El teléfono no puede superar los 9 dígitos.',
            corto: 'El teléfono debe tener 9 dígitos.'
        }
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        msgs: {
            vacio: 'El email es obligatorio.',
            formato: 'Introduce un email válido. Ejemplo: nombre@dominio.com'
        }
    }
};

function validarCampo(input, tipo) {
    const val = input.value.trim();
    const regla = REGLAS[tipo];
    const errEl = document.getElementById('error-' + tipo);
    let msg = '';

    if (!val) {
        msg = regla.msgs.vacio;
    } else if (tipo === 'nombre' || tipo === 'apellidos') {
        if (!regla.regex.test(val)) msg = regla.msgs.letras;
        else if (val.length > regla.maxLen) msg = regla.msgs.largo;
    } else if (tipo === 'telefono') {
        if (!regla.regex.test(val)) msg = regla.msgs.numeros;
        else if (val.length > regla.maxLen) msg = regla.msgs.largo;
        else if (val.length < 9) msg = regla.msgs.corto;
    } else if (tipo === 'email') {
        if (!regla.regex.test(val)) msg = regla.msgs.formato;
    }

    errEl.textContent = msg;
    input.classList.toggle('input-error', !!msg);
    input.classList.toggle('input-ok', !msg && val.length > 0);
    return !msg;
}

function validarTodo() {
    const okNombre = validarCampo(inputNombre, 'nombre');
    const okApels = validarCampo(inputApels, 'apellidos');
    const okTel = validarCampo(inputTel, 'telefono');
    const okEmail = validarCampo(inputEmail, 'email');
    return okNombre && okApels && okTel && okEmail;
}


// ── CÁLCULO DEL PRESUPUESTO ─────────────────

function calcularDescuento(base, extras, meses) {
    const subtotal = base + extras;
    let pct = 0;
    if (meses > 6) pct = 10;
    else if (meses > 3) pct = 5;
    return Math.round(subtotal * pct / 100);
}

function actualizarPresupuesto() {
    const base = parseInt(selectProd.value) || 0;
    const meses = parseInt(inputPlazo.value) || 1;
    let extras = 0;
    checkExtras.forEach(cb => { if (cb.checked) extras += parseInt(cb.value); });

    const descuento = calcularDescuento(base, extras, meses);
    const total = base + extras - descuento;

    // Actualizar total
    totalEl.textContent = total.toLocaleString('es-ES') + ' €';

    // Actualizar desglose
    desglosEl.textContent =
        'Base: ' + base.toLocaleString('es-ES') + ' €' +
        ' · Extras: ' + extras.toLocaleString('es-ES') + ' €' +
        ' · Descuento: −' + descuento.toLocaleString('es-ES') + ' €';

    // Badge de descuento
    if (descuento > 0) {
        const pct = meses > 6 ? 10 : 5;
        descBadge.textContent = '−' + pct + '% aplicado';
    } else {
        descBadge.textContent = '';
    }
}


// ── EVENTOS — Validación en tiempo real ─────

inputNombre.addEventListener('input', () => validarCampo(inputNombre, 'nombre'));
inputApels.addEventListener('input', () => validarCampo(inputApels, 'apellidos'));
inputTel.addEventListener('input', () => validarCampo(inputTel, 'telefono'));
inputEmail.addEventListener('input', () => validarCampo(inputEmail, 'email'));

// Bloquear teclas no numéricas en teléfono
inputTel.addEventListener('keypress', e => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
});

// Bloquear teclas no alfabéticas en nombre y apellidos
[inputNombre, inputApels].forEach(input => {
    input.addEventListener('keypress', e => {
        if (!/[a-zA-ZÀ-ÿ\s]/.test(e.key)) e.preventDefault();
    });
});


// ── EVENTOS — Presupuesto en tiempo real ────

selectProd.addEventListener('change', actualizarPresupuesto);
inputPlazo.addEventListener('input', actualizarPresupuesto);
checkExtras.forEach(cb => cb.addEventListener('change', actualizarPresupuesto));


// ── SUBMIT ───────────────────────────────────

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const contactoOk = validarTodo();

    // Validar condiciones
    let condOk = true;
    if (!checkCond.checked) {
        errCond.textContent = 'Debes aceptar la política de privacidad.';
        labelCond.classList.add('error');
        condOk = false;
    } else {
        errCond.textContent = '';
        labelCond.classList.remove('error');
    }

    if (!contactoOk || !condOk) return;

    // Todo correcto -> mostrar modal
    modalOverlay.classList.remove('hidden');
});

checkCond.addEventListener('change', function () {
    if (this.checked) {
        errCond.textContent = '';
        labelCond.classList.remove('error');
    }
});


// ── RESET ────────────────────────────────────

form.addEventListener('reset', function () {
    // Limpiar estilos y mensajes de error
    ['nombre', 'apellidos', 'telefono', 'email'].forEach(tipo => {
        const input = document.getElementById(tipo);
        const err = document.getElementById('error-' + tipo);
        input.classList.remove('input-error', 'input-ok');
        err.textContent = '';
    });
    labelCond.classList.remove('error');
    errCond.textContent = '';

    // Recalcular con valores por defecto tras el reset
    setTimeout(actualizarPresupuesto, 0);
});


// ── MODAL

modalCerrar.addEventListener('click', function () {
    modalOverlay.classList.add('hidden');
    form.reset();
});


// ── INICIO
actualizarPresupuesto();