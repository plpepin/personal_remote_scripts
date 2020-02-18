var node_html = document.documentElement,
    nodeList_scItems = node_html.querySelectorAll('.soundList__item');  // All first 10 items

// Cycle thru all 10 items
nodeList_scItems.forEach( (item) => {
    
    // Get the user who posted current item (track) to the stream..
    username = item.querySelector('.soundContext__usernameLink').text;
    
    // Create a classname using the user url page minus the '/' prefix 
    username_handle = item.querySelector('.g-avatar-badge-avatar-link').pathname.substring(1);
    
    // Assign new class to parent (item)
    item.classList.add('magicianonduty');

});

// Scroll page to get 10 more items. We grab the height of the entire and scroll by that amount.. 
// intListHeight = nodeList_scItems.scrollHeight;
// node_html.scrollBy(0, intListHeight)
// returns integer
