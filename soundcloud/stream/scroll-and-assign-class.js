var node_html = document.documentElement,
    nodeList_scItems = node_html.querySelectorAll('.soundList__item');  // All first 10 items

var htmlDoc = document.documentElement,
    htmlBody = document.querySelector('body'),
    container = null,
    buttons_class = "sc-button sc-button-medium sc-button-responsive";

container = createContainer();

// Cycle thru all 10 items
nodeList_scItems.forEach( (item) => {
    
    // Get the user who posted current item (track) to the stream..
    username = item.querySelector('.soundContext__usernameLink').text;
    
    // Create a classname using the user url page minus the '/' prefix 
    username_handle = "user-" + item.querySelector('.g-avatar-badge-avatar-link').pathname.substring(1);
    
    //console.log("username_handle class", username_handle);
    
    // Assign new class to parent (item)
    item.classList.add( username_handle );
    
    addButtonTo( container, username_handle, buttons_class, username );

});

function createContainer(){
  var div = document.createElement("div");
  div.id = "users_who_posted";
  htmlBody.appendChild(div);
  return div;
}

function handleUserWhoPostedClickEvent(e){
    var selector = "." + e.target.id,
        matching_items = null;
    
    matching_items = document.querySelectorAll( selector );
    matching_items.forEach(function(item){
        item.classList.add("show");
    });
}

function addButtonTo( parent_node, id, classname, label ){
  var btn = document.createElement("button"),
      btn_label = document.createTextNode(label);
  
  btn.id=id;
  btn.class=classname;
  btn.addEventListener("click", handleUserWhoPostedClickEvent );
   
  btn.appendChild( btn_label );
  
  if ( parent_node )
    parent_node.appendChild(btn);
  
  return btn;
}

// Scroll page to get 10 more items. We grab the height of the entire and scroll by that amount.. 
// intListHeight = nodeList_scItems.scrollHeight;
// node_html.scrollBy(0, intListHeight)
// returns integer
