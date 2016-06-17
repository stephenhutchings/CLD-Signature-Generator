$(document).ready(function(){
  var key = [];
  for (var i = 0; i < Contacts.length; i++) {
    $("#name").append(
      "<option value='" + i + "'>" +
      Contacts[i].firstname + "</option>"
    );
    key[i] = Contacts[i].name;
  };

  $("option[value='5']").attr("selected", "selected")

  $("form").on("change", function(e) {
    if ($("#name").val() == "Name") return;
    var index = $("#name").val(),
        list = $("#awards").attr("checked"),
        code = $("#code").attr("checked"),
        data = {contact: Contacts[index]},
        base = Templates.signature;

    data.awards = list ? Templates.awardsList({awards: Awards}) : Templates.awardsSimple();

    $("#sig-text").val(base(data));
    $("#sig-html").html(base(data));

    $("body").toggleClass("text", code);

  $("#error").html("");

  var attrs = ["firstname", "lastname", "mobile", "email", "role"],
      needs = 0;

  for (var i = attrs.length - 1; i >= 0; i--) {
    if (!data.contact[attrs[i]]) {
      $("#error").append(" &#10007; ");
      $("#error").append(attrs[i]);
      needs++;
    }
  };

  if (needs == 0) {
    $("#error").html("&#10004; All goodl!");
  } else {
    $("#error").append("&nbsp;<a href='mailto:stephen@creativelicence.com.au'>Add my other details</a>");
  }

  $("#error").toggleClass("red", needs > 0);

  }).trigger("change");
})
