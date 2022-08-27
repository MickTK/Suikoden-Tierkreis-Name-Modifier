$(document).ready(function(){

  // Pressing the 'Generate' button
  $('#generate_button').click(function(){
    var name = $('input').val(); // Retrieve name
    var hex_name = format(name); // Format name to haxadecimal array

    $('.deletable').remove();    // Delete output

    // Outputs action replay code
    if (name != ""){
      switch($('#type').val()){
        case 'hero':
          var ar_code = genHero(hex_name);
          break;
        case 'army':
          var ar_code = genArmy(hex_name);
          break;
        case 'castle':
          var ar_code = genCastle(hex_name);
          break;
      }
  
      var textarea = '<textarea readonly class="deletable" name="code_output" id="code_output" cols="17" rows="6">';
      textarea += ar_code + '</textarea>';
      $('#output').prepend(textarea);

      $('#copy_button').css('visibility', 'visible');
    }

    // If the name input is empty
    else {
      var p = '<p class="deletable">Name cannot be empty.</p>';
      $('#output').append(p);
      $('#copy_button').css('visibility', 'hidden');
    }
  });

  // Copy the output in the clipboard
  $('#copy_button').click(function(){
    $('#code_output').select();
    document.execCommand("copy");
    $('#code_output').blur();
    document.getSelection().removeAllRanges();
  });

  // On selection change
  $('#type').on('change',function(){
    $('.deletable').remove(); // Delete output
    $('#copy_button').css('visibility', 'hidden');
  });

  // Generate code pressing the enter key
  $(document).on('keypress',function(e) {
    // If the input box is focused and the enter key is pressed
    if(e.which == 13 && $('input').is(":focus")) {
      $('#generate_button').click(); // Press 'Generate' button
    }
  });
});

// Converts string to hexadecimal array, based on ASCII values
function format(text){

  text = Array.from(text); // Turn string to character array

  for (var i = 0; i < 16; i++){
    item = text[i];
    if (typeof item === 'undefined') text[i] = '00';              // Empty character
    else text[i] = item.charCodeAt(0).toString(16).toUpperCase(); // Conversion to hexadecimal
  }

  return text;
}

/********************************/
/* Generate action replay codes */
/********************************/

// Hero name
function genHero(name){
  var ar_code = 
  `20A31C18 ${name[3]}${name[2]}${name[1]}${name[0]}\n` +
  `20A31C1C ${name[7]}${name[6]}${name[5]}${name[4]}\n` +
  `20A31C20 ${name[11]}${name[10]}${name[9]}${name[8]}\n` +
  `20A31C24 ${name[15]}${name[14]}${name[13]}${name[12]}`;
  return ar_code;
}

// Army name
function genArmy(name){
  var ar_code = 
  `00A31C29 000000${name[0]}\n` +
  `10A31C2A 0000${name[2]}${name[1]}\n` +
  `20A31C2C ${name[6]}${name[5]}${name[4]}${name[3]}\n` +
  `20A31C30 ${name[10]}${name[9]}${name[8]}${name[7]}\n` +
  `20A31C34 ${name[14]}${name[13]}${name[12]}${name[11]}\n` +
  `00A31C38 000000${name[15]}`;
  return ar_code;
}

// Castle name
function genCastle(name){
  var ar_code = 
  `10A31C3A 0000${name[1]}${name[0]}\n` +
  `20A31C3C ${name[5]}${name[4]}${name[3]}${name[2]}\n` +
  `20A31C40 ${name[9]}${name[8]}${name[7]}${name[6]}\n` +
  `20A31C44 ${name[13]}${name[12]}${name[11]}${name[10]}\n` +
  `10A31C48 0000${name[15]}${name[14]}`;
  return ar_code;
}
