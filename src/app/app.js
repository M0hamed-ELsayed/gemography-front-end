// The auto-called function
$(function() {

  // setting the default page to 1
  let page = 1
  
  // incase the repo doesn't have a description we call this function, which will set a default description, otherwise it will return the description.
  const checkDisc = (item) => {
      if(!item.description) {
        return  item.description = 'No description provided'
      } else {
          return  item.description
      }
  }
  
  //ajax() method to make the api GET call
  const myCall = function(page) {
      $.ajax({
          url: "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc",
          type: "GET",
          data: {
              // here we set the page into the default value which is 1, and is increased when we scroll to the bottom of the page
              page: page
          },
          // on success we call this function, passing on the data to it
          success:  function(data) {
             // we loop over the object and grab each repo and store it in item
             data.items.forEach((item) => {
                 //here to utilize template literals to append new cards into the page 
                 $('.mywrapper').append(`  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 maincardb">
                 <div class="card h-100">
                   <div class="card-body">
                     <div class="account-settings">
                       <div class="user-profile">
                         <div class="user-avatar">
                          <a href="${item.owner.html_url}"> <img src="${item.owner.avatar_url}" alt="${item.owner.login}"></a>
                         </div>
                         <h5 class="user-name">${item.owner.login}</h5>
                         <a href="${item.html_url}"><h6 class="user-repo">${item.name}</h6></a>
                       </div>
                       <div class="about">
                         <h5 class="mb-2 text-primary description">Description</h5>
                         <p>${checkDisc(item)}</p>
                       </div>
                       <div class="about">
                       <span>Stars: ${item.stargazers_count}&nbsp; Issues: ${item.open_issues}</span>
                     </div>
                     </div>
                   </div>
                 </div>
               </div>`)
             })
          },
          // Console log any errors incase the api call fails.
          error: function(jqXHR, textStatus, errorThrown) {
              console.log(jqXHR, textStatus , errorThrown)
          }
      })
  }
  
  myCall()
  // An event listener which gets triggered each time we reach the bottom of the page, that will increment the page variable.
  $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
          page++
          myCall(page)
      }
   });
  });