// trigger the process
document.addEventListener('dblclick', () => {
    navigator.clipboard.readText().then( clipText => {
        // createNewRecord();
        setTimeout(() => { setAddress( clipText )}, 3000 );
    });
});

function createNewRecord() {
    $('a[href$="BillAdd.aspx"]')[0].click();
}

function validateAddress() {
    document.getElementById('btnJX').click();
}

function setAddress(address) {
    const formatAddress = passAddress(address);
    alert( formatAddress );
 
    const inputEdit = document.getElementById('txtSource');

    if( inputEdit ){
        inputEdit.value = formatAddress;
        setTimeout( validateAddress, 2000);
    } else {
        setTimeout( () => {
            document.getElementById('txtSource').value = formatAddress;
            setTimeout( validateAddress, 2000);
        }, 5000);
    }
}

function isPhoneNumber(text) {
    return text.match(/^-{0,1}\d+$/);
}

function passAddress(addressText) {
    if (!addressText) {
        return [];
    }

    let addressSegments = addressText.split(',');
    if (addressSegments.length < 3) {
        addressSegments = addressText.split(' ');
    }

    let street, phoneNumber, name;

    addressSegments.forEach(element => {
        element = element.trim();

        if (isPhoneNumber(element)) {
            phoneNumber = element;
        } else if (element.length > 5) {
            street = element
        } else {
            name = element;
        }
    });

    return `${name}, ${street}, ${phoneNumber}`;
}