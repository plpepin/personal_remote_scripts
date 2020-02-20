var node_html = document.documentElement,
    nodeList_scList = node_html.querySelector('.stream__list');

var htmlDoc = document.documentElement,
    htmlBody = document.querySelector('body'),
    container = null,
    buttons_class = "sc-button sc-button-medium sc-button-responsive",
    uniq_usr_btns = {};

container = createContainer();

var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
}

var observer = new MutationObserver(callback);
observer.observe(nodeList_scList, observerOptions);

function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      case 'childList':
        /* One or more children have been added to and/or removed
           from the tree; see mutation.addedNodes and
           mutation.removedNodes */
            initOrUpdateUserButtons();
        break;
      case 'attributes':
        /* An attribute value changed on the element in
           mutation.target; the attribute name is in
           mutation.attributeName and its previous value is in
           mutation.oldValue */
        break;
    }
  });
}

// Cycle thru all 10 items
function initOrUpdateUserButtons() {
    htmlColl_scItems = nodeList_scList.querySelectorAll('.soundList__item');
    htmlColl_scItems.forEach( (item) => {

        // Get the user who posted current item (track) to the stream..
        username = item.querySelector('.soundContext__usernameLink').text;

        // Create a classname using the user url page minus the '/' prefix 
        username_handle = "user-" + item.querySelector('.g-avatar-badge-avatar-link').pathname.substring(1);

        //console.log("username_handle class", username_handle);

        // Assign new class to parent (item)
        item.classList.add( username_handle );
        
        if( uniq_usr_btns.hasOwnProperty(username_handle) )
        {
            uniq_usr_btns[username_handle]++;
            updateButton( container, username_handle, username );
        }
        else {
            uniq_usr_btns[username_handle] = 1;
            addButtonTo( container, username_handle, buttons_class, username );
        }

    });
}

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
        item.classList.remove("hide");
    });
    document.querySelectorAll('.soundList__item:not('+selector+')').forEach(function(siblings){
        siblings.classList.add("hide");
    });
}

function addButtonTo( parent_node, id, classname, label ){
  var btn = document.createElement("button"),
      btn_label = document.createTextNode(label+" (1)");
  
  btn.id=id;
  btn.class=classname;
  btn.addEventListener("click", handleUserWhoPostedClickEvent );
   
  btn.appendChild( btn_label );
  
  if ( parent_node )
    parent_node.appendChild(btn);
  
  return btn;
}

function updateButton( parent_node, id, label ){
    var findDigit = new RegExp(/\d/),
        elButton = document.getElementById(id),
        currentLabel = elButton.textContent,
        newAmount = undefined,
        newLabel = label;
    
    newAmount = Number( findDigit.exec( currentLabel )[0] )+1;
    newLabel += " (" + newAmount + ")";
    
    elButton.textContent = newLabel;
}

// Scroll page to get 10 more items. We grab the height of the entire and scroll by that amount.. 
// intListHeight = htmlColl_scItems.scrollHeight;
// node_html.scrollBy(0, intListHeight)
// returns integer

initOrUpdateUserButtons();
