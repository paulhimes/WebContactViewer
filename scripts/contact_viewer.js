currentContact = "DateHere"
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
                      // This doesn't work because it's in the wrong scope...?      //It wasn't working because the Load of the contactDetailsPage was happening before currentContact was set to data.contact  CML 04/09/2013
                      currentContact = data.contact
                      loadContact()
                      
                    },
                    'json'
                  )})
          }
          $('#contactList').listview('refresh')
        },
        'json')
})

//Used to load the contact information to the page.  Thought it made more sence than doing so in the function above.
function loadContact(){

  var currentName = currentContact.name
  var currentTitle = currentContact.title
  var currentEmail = currentContact.email
  var currentPhone = currentContact.phone
  var currentTwitter = currentContact.twitterId

  $('#contactDetailsContent').html('<h1>' + currentContact.name + '</h1><hr><h3>' + currentTitle + '</h3>' + currentEmail + '<br>' + currentPhone + '<br>' + currentTwitter + '<br>')
}



/*     Not Using
// Load the Contact Details Page
$("#contactDetailsPage").on("pagebeforeshow", function(id) {                //This function is Happening BEFORE the one above that sets currentContact

	// Fill in the data labels.
	         //$('#contactDetailsContent').html(currentContact.name)

})
*/