$(document).ready(function() {
    // Load items from local storage
    loadItems();

    // Add new item
    $('#add-item-form').on('submit', function(event) {
        event.preventDefault();
        const name = $('#item-name').val();
        const required_stock = $('#item-required-stock').val();
        const available_stock = $('#item-available-stock').val();
        const buy = required_stock - available_stock;
        
        const newRow = `<tr>
            <td>${name}</td>
            <td>${required_stock}</td>
            <td>${available_stock}</td>
            <td>${buy}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="save-btn" style="display:none;">Save</button>
            </td>
        </tr>`;
        
        $('#inventory-table tbody').append(newRow);
        
        // Save items to local storage
        saveItems();
        
        // Clear the form
        $('#item-name').val('');
        $('#item-required-stock').val('');
        $('#item-available-stock').val('');
    });

    // Edit item
    $(document).on('click', '.edit-btn', function() {
        const row = $(this).closest('tr');
        row.find('td:eq(0), td:eq(1), td:eq(2)').attr('contenteditable', 'true').addClass('editable');
        row.find('.edit-btn').hide();
        row.find('.save-btn').show();
    });

    // Save item
    $(document).on('click', '.save-btn', function() {
        const row = $(this).closest('tr');
        row.find('td:eq(0), td:eq(1), td:eq(2)').removeAttr('contenteditable').removeClass('editable');
        row.find('.save-btn').hide();
        row.find('.edit-btn').show();
        saveItems();
    });

    // Delete item
    $(document).on('click', '.delete-btn', function() {
        $(this).closest('tr').remove();
        saveItems();
    });

    // Save items to local storage
    function saveItems() {
        const items = [];
        $('#inventory-table tbody tr').each(function() {
            const name = $(this).find('td:eq(0)').text();
            const required_stock = $(this).find('td:eq(1)').text();
            const available_stock = $(this).find('td:eq(2)').text();
            items.push({ name, required_stock, available_stock });
        });
        localStorage.setItem('inventoryItems', JSON.stringify(items));
        loadItems();
    }

    // Load items from local storage
    function loadItems() {
        clearTable();
        const items = JSON.parse(localStorage.getItem('inventoryItems')) || [];
        items.forEach(item => {
            const newRow = `<tr>
                <td>${item.name}</td>
                <td>${item.required_stock}</td>
                <td>${item.available_stock}</td>
                <td>${item.required_stock-item.available_stock}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="save-btn" style="display:none;">Save</button>
                </td>
            </tr>`;
            $('#inventory-table tbody').append(newRow);
        });
    }

    function clearTable() {
        $('#inventory-table tbody').empty();
    }
});
