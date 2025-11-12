// Reusable Components
const Components = {
    // Page header
    pageHeader(title, subtitle, action) {
        return `
            <div class="flex justify-between items-center mb-3">
                <div>
                    <h1>${title}</h1>
                    ${subtitle ? `<p class="text-gray">${subtitle}</p>` : ''}
                </div>
                ${action || ''}
            </div>
        `;
    },

    // Card
    card(title, content, headerAction = '') {
        return `
            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <div class="card-title">${title}</div>
                        ${headerAction}
                    </div>
                </div>
                <div class="card-content">
                    ${content}
                </div>
            </div>
        `;
    },

    // Button
    button(text, onclick, type = 'primary', icon = '') {
        return `
            <button class="btn btn-${type}" onclick="${onclick}">
                ${icon ? `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">${icon}</svg>` : ''}
                ${text}
            </button>
        `;
    },

    // Alert
    alert(message, type = 'error') {
        const icons = {
            error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
            success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
        };
        
        return `
            <div class="alert alert-${type}">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${icons[type]}
                </svg>
                <div>${message}</div>
            </div>
        `;
    },

    // Form input
    formGroup(label, id, type = 'text', placeholder = '', value = '') {
        return `
            <div class="form-group">
                <label class="label" for="${id}">${label}</label>
                <input class="input" type="${type}" id="${id}" placeholder="${placeholder}" value="${value}">
            </div>
        `;
    },

    // Select
    formSelect(label, id, options, selected = '') {
        return `
            <div class="form-group">
                <label class="label" for="${id}">${label}</label>
                <select class="select" id="${id}">
                    <option value="">Selecciona una opción</option>
                    ${options.map(opt => `
                        <option value="${opt.value}" ${selected === opt.value ? 'selected' : ''}>
                            ${opt.label}
                        </option>
                    `).join('')}
                </select>
            </div>
        `;
    },

    // Textarea
    formTextarea(label, id, placeholder = '', value = '', rows = 5) {
        return `
            <div class="form-group">
                <label class="label" for="${id}">${label}</label>
                <textarea class="textarea" id="${id}" placeholder="${placeholder}" rows="${rows}">${value}</textarea>
            </div>
        `;
    },

    // Table
    table(headers, rows) {
        return `
            <div class="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    // Badge
    badge(text, type = 'secondary') {
        return `<span class="badge badge-${type}">${text}</span>`;
    },

    // Search box
    searchBox(onInput, placeholder = 'Buscar...') {
        return `
            <div class="search-box">
                <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input class="input" type="text" placeholder="${placeholder}" oninput="${onInput}">
            </div>
        `;
    },

    // Success screen
    successScreen(title, subtitle, details, onCreateAnother, onViewAll) {
        return `
            <div class="success-screen">
                <div class="card" style="border: 1px solid var(--green-100);">
                    <div class="card-content">
                        <div class="text-center">
                            <div class="success-icon-wrapper">
                                <svg class="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h2 class="text-primary">${title}</h2>
                            <p class="text-gray mb-3">${subtitle}</p>
                            ${details ? `<div class="info-box mb-3">${details}</div>` : ''}
                            <div class="flex gap-3 justify-center">
                                <button class="btn btn-primary" onclick="${onCreateAnother}">
                                    Crear otro
                                </button>
                                <button class="btn btn-outline" onclick="${onViewAll}">
                                    Ver todos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};