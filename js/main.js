const mobileAddBtn = document.querySelector('#add-btn-mobile');
const mobileCloseBtn = document.querySelector('#mobile-close-btn');
const addBtn = document.querySelector('#ticket-form button');
const modal = document.querySelector('#modal');

mobileAddBtn.addEventListener('click', handleTicketPanel);
mobileCloseBtn.addEventListener('click', handleTicketPanel);
addBtn.addEventListener('click', validateForm);
modal.addEventListener('click', closeModal);

// On mobile devices, show/hide ticket panel
function handleTicketPanel() {
    const ticketPanel = document.querySelector('#ticket-panel');

    document.body.classList.toggle('noscroll');

    if (ticketPanel.style.visibility === 'visible') {
        return ticketPanel.style.visibility = 'hidden';
    } else {
        return ticketPanel.style.visibility = 'visible';
    }   
}

function validateForm(e) {
    e.preventDefault();
    
    const msg = document.querySelector('#msg');
    const errors = [];
    const fields = [
        document.querySelector('#title'),
        document.querySelector('#description'),
        document.querySelector('#reporter'),
        document.querySelector('#assignee'),
    ];

    fields.forEach(field => {
        if (field.value === '') {
            errors.push(field);
            field.classList.add('unfilled-field');
        } else {
            field.classList.remove('unfilled-field');
        }
    });

    if (errors.length === 0) {
        msg.classList.remove('error-msg');
        msg.innerText = '';

        createTicket();

        fields.forEach(field => field.value = '');

        document.querySelector('#priority').selectedIndex = 0;

        handleNoIssuesMsg();

        if (window.innerWidth > 1024) {
            return;
        } else {
            return handleTicketPanel();
        }
        
    } else {
        msg.classList.add('error-msg');
        msg.innerText = 'Please enter all fields';
    }
}

function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function createTicket() {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const reporter = document.querySelector('#reporter').value;
    const assignee = document.querySelector('#assignee').value;
    const priority = document.querySelector('#priority').value;

    const ticketDiv = document.createElement('div');
    const ticketHeader = document.createElement('header');
    const statusLabel = document.createElement('button');
    const headerContainer = document.createElement('div');
    const ticketTitle = document.createElement('h3');
    const ticketDescription = document.createElement('p');
    const removeBtn = document.createElement('button');
    const ticketFooter = document.createElement('footer');
    const detailsDiv_1 = document.createElement('div');
    const detailsDiv_2 = document.createElement('div');
    const detailsDiv_3 = document.createElement('div');
    const detailsDiv_4 = document.createElement('div');
    const titleCreated = document.createElement('h4');
    const titleReporter = document.createElement('h4');
    const titleAssignee = document.createElement('h4');
    const titlePriority = document.createElement('h4');
    const detailsDate = document.createElement('span');
    const detailsReporter = document.createElement('span');
    const detailsAssignee = document.createElement('span');
    const detailsPriority = document.createElement('span');

    ticketDiv.classList.add('ticket');
    statusLabel.classList.add('status-label');
    headerContainer.classList.add('header-container');
    removeBtn.classList.add('close-btn');
    removeBtn.classList.add('btn');
    detailsDiv_1.classList.add('ticket-details');
    detailsDiv_2.classList.add('ticket-details');
    detailsDiv_3.classList.add('ticket-details');
    detailsDiv_4.classList.add('ticket-details');
    detailsPriority.classList.add('priority');

    ticketTitle.innerText = title;
    ticketDescription.innerText = description;
    removeBtn.innerText = 'X';
    titleCreated.innerText = 'Created';
    detailsDate.innerText = getDate();
    titleReporter.innerText = 'Reporter';
    detailsReporter.innerText = reporter;
    titleAssignee.innerText = 'Assignee';
    detailsAssignee.innerText = assignee;
    titlePriority.innerText = 'Priority';
    detailsPriority.innerText = priority;

    // Store values for modal use
    ticketDiv.setAttribute('title', title);
    ticketDiv.setAttribute('description', description);
    ticketDiv.setAttribute('reporter', reporter);
    ticketDiv.setAttribute('assignee', assignee);
    ticketDiv.setAttribute('priority', priority);
    ticketDiv.setAttribute('date', getDate());
    
    // Set and store priority color for modal use
    (function() {
        if (detailsPriority.innerText == 'low') {
            detailsPriority.style.color = '#16C79A';
            ticketDiv.setAttribute('priorityColor', '#16C79A');
        } else if (detailsPriority.innerText == 'medium') {
            detailsPriority.style.color = '#E6B566';
            ticketDiv.setAttribute('priorityColor', '#E6B566');
        } else {
            detailsPriority.style.color = '#e74c3c';
            ticketDiv.setAttribute('priorityColor', '#e74c3c');
        }
    })();

    removeBtn.addEventListener('click', removeTicket);
    statusLabel.addEventListener('click', handleStatusLabel);
    ticketDiv.addEventListener('click', openModal);

    headerContainer.appendChild(ticketTitle);
    headerContainer.appendChild(ticketDescription);
    ticketHeader.appendChild(statusLabel);
    ticketHeader.appendChild(headerContainer);
    ticketHeader.appendChild(removeBtn);

    detailsDiv_1.appendChild(titleCreated);
    detailsDiv_1.appendChild(detailsDate);
    detailsDiv_2.appendChild(titleReporter);
    detailsDiv_2.appendChild(detailsReporter);
    detailsDiv_3.appendChild(titleAssignee);
    detailsDiv_3.appendChild(detailsAssignee);
    detailsDiv_4.appendChild(titlePriority);
    detailsDiv_4.appendChild(detailsPriority);

    ticketFooter.appendChild(detailsDiv_1);
    ticketFooter.appendChild(detailsDiv_2);
    ticketFooter.appendChild(detailsDiv_3);
    ticketFooter.appendChild(detailsDiv_4);

    ticketDiv.appendChild(ticketHeader);
    ticketDiv.appendChild(ticketFooter);

    document.querySelector('#tickets').prepend(ticketDiv);
}

function removeTicket(e) {
    const target = e.target;
    const ticket = target.parentNode.parentNode;
    ticket.remove();
    return handleNoIssuesMsg();
}

function handleStatusLabel(e) {
    const target = e.target;
    target.classList.toggle('status-label-solved');
}

function handleNoIssuesMsg() {
    const msg = document.querySelector('#no-issues-msg');
    const ticket = document.querySelector('.ticket');

    if (ticket) {
        msg.style.display = 'none';
    } else {
        msg.style.display = 'block';
    }
}

function openModal(e) {
    const modal = document.querySelector('#modal');
    const target = e.currentTarget;
    
    if (e.target.tagName !== 'BUTTON') {
        document.body.classList.add('noscroll');
        modal.style.display = 'flex';
    }

    return handleModal(target);
}

function closeModal(e) {
    const closeBtn = document.querySelector('#modal-ticket .close-btn');

    if (e.target == closeBtn) {
        document.body.classList.remove('noscroll');
        modal.style.display = 'none';
    }
}

function handleModal(e) {
    const title = document.querySelector('#modal-title');
    const description = document.querySelector('#modal-description');
    const created = document.querySelector('#modal-created');
    const reporter = document.querySelector('#modal-reporter');
    const assignee = document.querySelector('#modal-assignee');
    const priority = document.querySelector('#modal-priority');

    const dataTitle = e.getAttribute('title');
    const dataDescription = e.getAttribute('description');
    const dataDate = e.getAttribute('date');
    const dataReporter = e.getAttribute('reporter');
    const dataAssignee = e.getAttribute('assignee');
    const dataPriority = e.getAttribute('priority');
    const dataPriorityColor = e.getAttribute('priorityColor');

    title.innerText = dataTitle;
    description.innerText = dataDescription;
    created.innerText = dataDate;
    reporter.innerText = dataReporter;
    assignee.innerText = dataAssignee;
    priority.innerText = dataPriority;
    priority.style.color = dataPriorityColor;
}