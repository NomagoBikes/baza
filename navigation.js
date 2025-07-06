// navigation.js - Centralizirani navigacijski sistem NOMAGO bikes
// Verzija 1.0 - 2024

class NavigationManager {
    constructor() {
        this.currentUser = null;
        this.menuItems = [
            {
                id: 'dashboard',
                icon: '🏠',
                label: 'Baza',
                url: 'dashboard.html',
                order: 1,
                roles: ['admin', 'serviser', 'student'],
                systems: []
            },
            {
                id: 'pregledi',
                icon: '🔧',
                label: 'Pregledi',
                url: 'pregledi.html',
                order: 2,
                roles: ['admin', 'serviser', 'student'],
                systems: []
            },
            {
                id: 'chat',
                icon: '💬',
                label: 'Chat',
                url: 'chat.html',
                order: 3,
                roles: ['admin', 'serviser', 'student'],
                systems: []
            },
            {
                id: 'users',
                icon: '👥',
                label: 'Uporabniki',
                url: 'users.html',
                order: 4,
                roles: ['admin'],
                systems: []
            },
            {
                id: 'notifications',
                icon: '📢',
                label: 'Obvestila',
                url: 'notifications.html',
                order: 5,
                roles: ['admin'],
                systems: []
            },
            {
                id: 'locations',
                icon: '🏢',
                label: 'Lokacije',
                url: 'admin_locations.html',
                order: 6,
                roles: ['admin'],
                systems: []
            },
            {
                id: 'settings',
                icon: '⚙️',
                label: 'Nastavitve',
                url: 'settings.html',
                order: 7,
                roles: ['admin', 'serviser', 'student'],
                systems: []
            }
        ];

        this.quickActions = [
            {
                id: 'pregledi_quick',
                icon: '🔧',
                title: 'Pregledi ključavnic',
                description: 'Izvedi preglede in beleženje statusov ključavnic',
                url: 'pregledi.html',
                buttonText: 'Odpri preglede',
                buttonClass: 'btn-success',
                roles: ['admin', 'serviser', 'student'],
                order: 1
            },
            {
                id: 'chat_quick',
                icon: '💬',
                title: 'Chat sistem',
                description: 'Komunikacija s sodelavci in skupinami',
                url: 'chat.html',
                buttonText: 'Odpri chat',
                buttonClass: '',
                roles: ['admin', 'serviser', 'student'],
                order: 2
            },
            {
                id: 'export_quick',
                icon: '📊',
                title: 'Izvozi poročilo',
                description: 'Celotno poročilo o stanju sistemov',
                url: '#',
                buttonText: 'Izvozi CSV',
                buttonClass: '',
                onClick: 'exportDashboardReport()',
                roles: ['admin', 'serviser'],
                order: 3
            },
            {
                id: 'notifications_quick',
                icon: '✉️',
                title: 'Upravljaj obvestila',
                description: 'Dodaj in upravljaj sistemska obvestila',
                url: 'notifications.html',
                buttonText: 'Odpri obvestila',
                buttonClass: '',
                roles: ['admin'],
                order: 4
            },
            {
                id: 'users_quick',
                icon: '👥',
                title: 'Upravljaj uporabnike',
                description: 'Dodaj in urejaj uporabniške račune',
                url: 'users.html',
                buttonText: 'Upravljaj uporabnike',
                buttonClass: '',
                roles: ['admin'],
                order: 5
            },
            {
                id: 'locations_quick',
                icon: '🏢',
                title: 'Upravljaj lokacije',
                description: 'Dodaj in urejaj lokacije ter sisteme',
                url: 'admin_locations.html',
                buttonText: 'Upravljaj lokacije',
                buttonClass: '',
                roles: ['admin'],
                order: 6
            }
        ];
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    hasAccess(item) {
        if (!this.currentUser) return false;
        
        // Preveri vlogo
        if (!item.roles.includes(this.currentUser.vloga)) {
            return false;
        }
        
        // Preveri sisteme (če so definirani)
        if (item.systems && item.systems.length > 0) {
            if (!this.currentUser.accessibleSystems) return false;
            
            const hasSystemAccess = item.systems.some(system => 
                this.currentUser.accessibleSystems.includes(system)
            );
            if (!hasSystemAccess) return false;
        }
        
        return true;
    }

    generateMainMenu(currentPageId = '') {
        const visibleItems = this.menuItems
            .filter(item => this.hasAccess(item))
            .sort((a, b) => a.order - b.order);

        let html = '';
        visibleItems.forEach(item => {
            const isActive = item.id === currentPageId ? 'active' : '';
            html += `<a href="${item.url}" class="${isActive}">${item.icon} ${item.label}</a>`;
        });
        
        // Dodaj logout na konec
        html += `<a href="#" onclick="logout()">🚪 Odjavi se</a>`;
        
        return html;
    }

    generateQuickActions() {
        const visibleActions = this.quickActions
            .filter(action => this.hasAccess(action))
            .sort((a, b) => a.order - b.order);

        let html = '';
        visibleActions.forEach(action => {
            const clickHandler = action.onClick ? 
                `onclick="${action.onClick}; event.stopPropagation();"` : 
                `onclick="window.location.href='${action.url}'"`;
            
            html += `
                <div class="quick-action-card" ${clickHandler}>
                    <div class="quick-action-icon">${action.icon}</div>
                    <div class="quick-action-title">${action.title}</div>
                    <div class="quick-action-desc">${action.description}</div>
                    <button class="${action.buttonClass}">${action.buttonText}</button>
                </div>
            `;
        });
        
        return html;
    }

    generateUserInfo() {
        if (!this.currentUser) return '';
        
        return `
            <span id="userName">${this.currentUser.ime} ${this.currentUser.priimek}</span>
            <button class="chat-btn" onclick="openChat()" title="Odpri chat">💬</button>
            <button class="logout-btn" onclick="logout()" title="Odjavi se">🚪</button>
        `;
    }

    addMenuItem(item) {
        const existingIndex = this.menuItems.findIndex(existing => existing.id === item.id);
        
        if (existingIndex !== -1) {
            this.menuItems[existingIndex] = { ...this.menuItems[existingIndex], ...item };
        } else {
            this.menuItems.push(item);
        }
        
        this.updateMenu();
    }

    addQuickAction(action) {
        const existingIndex = this.quickActions.findIndex(existing => existing.id === action.id);
        
        if (existingIndex !== -1) {
            this.quickActions[existingIndex] = { ...this.quickActions[existingIndex], ...action };
        } else {
            this.quickActions.push(action);
        }
        
        // Ponovno generiraj quick actions (samo na dashboard)
        if (document.querySelector('.quick-actions')) {
            this.updateQuickActions();
        }
    }

    updateMenu(currentPageId = '') {
        const menuContainer = document.querySelector('.menu');
        if (menuContainer) {
            menuContainer.innerHTML = this.generateMainMenu(currentPageId);
        }
    }

    updateQuickActions() {
        const quickActionsContainer = document.querySelector('.quick-actions');
        if (quickActionsContainer) {
            quickActionsContainer.innerHTML = this.generateQuickActions();
        }
    }

    updateUserInfo() {
        const userInfoContainer = document.getElementById('userInfo');
        if (userInfoContainer) {
            userInfoContainer.innerHTML = this.generateUserInfo();
        }
    }

    initialize(currentPageId = '') {
        // Preberi trenutnega uporabnika
        const savedUser = sessionStorage.getItem('currentUser');
        if (savedUser) {
            this.setCurrentUser(JSON.parse(savedUser));
        }

        // Generiraj navigacijo
        this.updateMenu(currentPageId);
        this.updateUserInfo();
        
        // Če obstajajo quick actions, jih generiraj
        if (document.querySelector('.quick-actions')) {
            this.updateQuickActions();
        }
    }
}

// Globalna instanca
window.navigationManager = new NavigationManager();

// Helper funkcije za enostavno uporabo
window.initNavigation = function(currentPageId = '') {
    window.navigationManager.initialize(currentPageId);
};

window.addNavigationItem = function(item) {
    window.navigationManager.addMenuItem(item);
};

window.addQuickAction = function(action) {
    window.navigationManager.addQuickAction(action);
};

console.log('NOMAGO Navigation System loaded successfully');