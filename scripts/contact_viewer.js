var currentContact
var abcde = "fghij"

// Load the Contact List Page
$("#contactListPage").on("pagebeforeshow", function() {
	// Get all the contacts.
	$.get('http://contacts.tinyapollo.com/contacts?key=letitbe',
        function(data) {
          var contacts = data.contacts
          $('#contactList').html('')
          for(var i = 0; i < contacts.length; i++) {
            // Add each contact to the list.
            var name = contacts[i].name
            var id = contacts[i]._id

            $('#contactList').append('<li id="contact' + id + '" accessKey="' + id + '"><a href="#contactDetailsPage">' + name + '</a></li>')     //added accessKey CML 04/09/2013

            $('#contact' + id).on("click", function(event){           //added event to get the details of the sender (target) CML 04/09/2013

              $.get('http://contacts.tinyapollo.com/contacts/' + event.currentTarget.accessKey + '/?key=letitbe',       //needed to get id dynamically after onCLick.  Used accessKey  CML 04/09/2013

                    function(data) {
                      //console.log(data.contact)
                      // This doesn't work because it's in the wrong scope...?
                      currentContact = data.contact
                    },
                    'json'
                  )})
          }
          $('#contactList').listview('refresh')
        },
        'json')
})


// Load the Contact Details Page
$("#contactDetailsPage").on("pagebeforeshow", function() {
	// Fill in the data labels.
	         //$('#contactDetailsContent').html(currentContact.name)
           console.log(currentContact)
})
