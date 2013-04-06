var currentContact

// Load the Contact List Page
$("#contactListPage").on("pagebeforeshow", function() {
	// Get all the contacts.
	$.get('http://contacts.tinyapollo.com/contacts?key=letitbe',
	function(data) {
	  var contacts = data.contacts
	  $('#contactList').html('')
	  for(var i = 0; i < contacts.length; i++) {
	    // Add each contact to the list.
		currentContact = contacts[i]
	    $('#contactList').append('<li><a href="#contactDetailsPage">' + contacts[i].name + '</a></li>')
	  }
		$('#contactList').listview('refresh')
	},
	'json')
})

// Load the Contact Details Page
$("#contactDetailsPage").on("pagebeforeshow", function() {
	// Fill in the data labels.
	$('#contactDetailsContent').html(currentContact.name)
})