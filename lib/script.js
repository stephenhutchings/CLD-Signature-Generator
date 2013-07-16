$(document).ready(function(){
  var key = [];
  for (var i = 0; i < Contacts.length; i++) {
    $("#name").append("<option value='" + i + "''>"+Contacts[i].firstname+"</option>");
    key[i] = Contacts[i].name;
  };

  $("form").on("change", function(e) {
    if ($("#name").val() == "Name") return;
    var index = $("#name").val(),
        list = $("#awards").attr("checked"),
        code = $("#code").attr("checked"),
        snova = $("#shoppernova").attr("checked"),
        data = Contacts[index],
        awards = list ? Templates.awardsList() : Templates.awardsSimple(),
        base = snova ? Templates.shoppernova : Templates.signature,
        jade = $(base(data));

    jade.find("#awards").html(awards);
    console.log(jade.html());

    $("#sig-text").val(base(data));
    $("#sig-html").html(jade.clone());

    $("body").toggleClass("text", code);

  $("#error").html("");
  var attrs = ["firstname", "lastname", "mobile", "email", "role"],
      needs = 0;

  if (snova) attrs.push("shoppernova_email")
  for (var i = attrs.length - 1; i >= 0; i--) {
    if (!data[attrs[i]]) {
      // if (needs > 0) 
      $("#error").append(" &#10007; ");
      $("#error").append(attrs[i]);
      needs++;
    }
  };

  if (needs == 0) $("#error").html("&#10004; All goodl!");
  else $("#error").append("&nbsp;<a href='mailto:stephen@creativelicence.com.au'>Add my other details</a>");
  $("#error").toggleClass("red", needs > 0);

  }).trigger("change");
})