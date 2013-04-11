var currentContact = 0
var abcde = "fghij"

// Load the Contact List Page
$("#contactListPage").on("pagebeforeshow", function() {
	// Get all the contacts

  currentContact=0;     //reset variable so when we add we don't have a prefill

	$.get('http://contacts.tinyapollo.com/contacts?key=letitbe',
        function(data) {
          var contacts = data.contacts
          $('#contactList').html('')
          for(var i = 0; i < contacts.length; i++) {
            // Add each contact to the list.
            var name = contacts[i].name
            var id = contacts[i]._id

            $('#contactList').append('<li id="contact' + id + '" accessKey="' + id + '"><a href="#contactDetailsPage" data-transition="slide">' + name + '</a></li>')     //added accessKey CML 04/09/2013

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

// Load the Edit Details Page
$("#editContactPage").on("pagebeforeshow", function() {

          //Default all fields to empty
            $('#editContactHeaderContent').html('Edit Contact')
            $('#contactName').val('')
            $('#contactTitle').val('')
            $('#contactEmail').val('')
            $('#contactPhone').val('')
            $('#contactTwitterId').val('')


          if (currentContact==0){
            //this is an add form
            $('#editContactHeaderContent').html('Add Contact')

          }
          else {
            $('#editContactHeaderContent').html('Edit Contact')
            $('#contactName').val(currentContact.name)
            $('#contactTitle').val(currentContact.title)
            $('#contactEmail').val(currentContact.email)
            $('#contactPhone').val(currentContact.phone)
            $('#contactTwitterId').val(currentContact.twitterId)
          }
          //Add edit form
          

})





//Used to load the contact information to the page.  Thought it made more sence than doing so in the function above.
function loadContact(){

  var currentName = currentContact.name
  var currentTitle = currentContact.title
  var currentEmail = currentContact.email
  var currentPhone = currentContact.phone
  var currentTwitter = currentContact.twitterId
    $('#contactDetailsContent').html('')
    $('#contactDetailsContent').append('<h1>' + currentContact.name + '</h1>')
    $('#contactDetailsContent').append('<hr><h3>' + currentTitle + '</h3>')
    $('#contactDetailsContent').append('<label>Email:</label>' + currentEmail + '<br>')
    $('#contactDetailsContent').append('<label>Phone:</label>' + currentPhone + '<br>')
    $('#contactDetailsContent').append('<label>Twitter Id:</label>' + currentTwitter + '<br>')
}

//Save Contact to the ContactList
function addContact(){

    var contactName = $('#contactName').val()
    var contactTitle =  $('#contactTitle').val()
    var contactEmail = $('#contactEmail').val()
    var contactPhone = $('#contactPhone').val()
    var contactTwitterId = $('#contactTwitterId').val()

    if (contactName != ''){

      
      $.post("http://contacts.tinyapollo.com/contacts/?key=letitbe",
      {
        name:contactName,
        title:contactTitle,
        email:contactEmail,
        phone:contactPhone,
        twitterId:contactTwitterId
      })

      window.location.href="#contactListPage"

    }
}
//Save Contact to the ContactList
function saveContact(){
    var contactName = $('#contactName').val()
    var contactTitle =  $('#contactTitle').val()
    var contactEmail = $('#contactEmail').val()
    var contactPhone = $('#contactPhone').val()
    var contactTwitterId = $('#contactTwitterId').val()

    console.log("Posting")

    $.put("http://contacts.tinyapollo.com/contacts/?key=letitbe",
    {
      _id:currentContact._id,
      name:contactName,
      title:contactTitle,
      email:contactEmail,
      phone:contactPhone,
      twitterId:contactTwitterId
    })

    console.log("Posted")

}

//Cancel Button off of the edit/add page
$('#cancelButton').on('click',function(){
    if (currentContact==0){
      //From Add Screen
      window.location.href="#contactListPage"
    }
    else{
      //From Edit
      window.location.href="#contactDetailsPage"
    }
})

//Save Button off of the edit/add page
$('#saveButton').on('click',function(){
    if (currentContact==0){
      //Add Contact
      addContact()
    }
    else{
      //Edit Contact
      saveContact()
    }
})

//Delete button off of the Details Page
$('#deleteButton').on('click',function(element){

   var currentName = currentContact.name

  var r=confirm("You are about to delete '" + currentName + "'' from your contact list.");
 if (r==true)
   {
      deleteContact(currentContact._id)
   }
 

})



//Delete Contact from the List
function deleteContact(id){         ////Not working
$.ajax({
  url: 'http://contacts.tinyapollo.com/contacts/' + id + '?key=letitbe',
  type: 'DELETE',
  dataType: 'json',
  data: '',
  success: function(response) { console.log('PUT completed'+response) }
  })
}