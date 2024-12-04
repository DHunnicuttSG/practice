// Sample data
const data = [
    { name: "John Doe", phone: "123-456-7890", email: "john@example.com" },
    { name: "Jane Smith", phone: "987-654-3210", email: "jane@example.com" },
    { name: "Alice Johnson", phone: "555-123-4567", email: "alice@example.com" }
];

// Function to create table
function createTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = ['Name', 'Phone', 'Email'];
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    // Create table rows
    data.forEach(item => {
        const tr = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

// Append table to the container
document.getElementById('table-container').appendChild(createTable(data));
