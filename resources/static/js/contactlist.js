function Contact(id, name, phone, mail, gender) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.mail = mail;
    this.gender = gender;
}

function add() {
    debugger;
    var contacts = getAll();
    var id = contacts.length + 1;
    var name = $("#name").val();
    var phone = $("#phone").val();
    var mail = $("#mail").val();
    var index="";
    var gender = "";
    if ($("#gender .ui-flipswitch").hasClass("ui-flipswitch-active")) {
        gender = "Male";
    } else {
        gender = "Female";
    }
    if (name.trim( ) !== "" && phone.trim( ) !== "" && $("#errorName").text() == "" && $("#errorMail").text() == "" && $("#errorphone").text() == "") {
        $("#errorName").text("");
        $("#errorPhone").text("");
        if ($("#cancelUpdate").css("display") == "block") {
            //update Contact
            var id = $("#save span").attr("id");
            contacts.forEach((contact) => {
                debugger;
                if (contact.id == id) {
                    // replace old one here
                    var contactJson = new Contact(id, name, phone, mail, gender);
                    index = contacts.indexOf(contact);
                    contact = contactJson;
                    contacts.splice( index, 1, contact );
                }
            });
            localStorage.setItem("contacts", JSON.stringify(contacts));
        } else {
            // add contact
            var contactJson = new Contact(id, name, phone, mail, gender);
            contacts.push(contactJson);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            cleardata();
        }
    } else {
        $("#errorName").text("invalid name");
        $("#errorphone").text("invalid phone Number");
    }

}
function cleardata() {
    $("#name").val("");
    $("#phone").val("");
    $("#mail").val("");
}

function update(contacts) {
    debugger;


}

function del(id) {
    debugger;
    var contacts = getAll();
    var index = "";
    contacts.forEach(con => {
        debugger;
        if (id == con.id) {
            contact = con;
            index = contacts.indexOf(con);
            contacts.splice(index, 1);
        }
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function getAll() {
    return JSON.parse(localStorage.getItem("contacts") || "[]");
}


function showContactCell() {
    debugger;
    // $("#movie-table")
    var contacts = getAll();
    if (contacts.length > 0) {
        $("#contact-List").html("");
        for (var i = 0; i < contacts.length; i++) {

            debugger;
            var contact = contacts[i];
            var imgSrc = "";
            if (contact.gender == "Male") {
                imgSrc = "../../static/images/male.png";
            } else {
                imgSrc = "../../static/images/female.png";
            }
            var cell = "<li  style=' padding:5px ;    background:#ddf6f3;list-style: none;border: 1px solid #068c93;' >"
                    + "<a href='#thirdPage' id='" + contact.id + "' onclick='openContact(this)'>"
                    + "<div style='display:inline-block;width:10%'><img width='40px' height='40px' style='    vertical-align: unset;' src='" + imgSrc + "'/></div>"
                    + "<div style='display:inline-block;width:70%'>"
                    + "<p style='font-weight:bold;font-size:20px;padding-left:8px;color:black'>" + contact.name + "</p></div>"
                    + "<div style='display:inline-block;width:20%'>"
                    + "<a style='background:#36e34b;padding: 22px 30px;margin:0px' href='tel:" + contact.phone + "' data-icon='phone' data-role='button' ></a></div>"
                    + "</a></li> ";
            $("#contact-List").append(cell);
        }
    }
}
function validateEmail(emailText) {
    debugger;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailText.value.match(mailformat))
    {
        $("#errorMail").text("invalid Email");
    } else {
        $("#errorMail").text("");
    }

}
function validateMobile(phonetext) {
    debugger;
    var phoneno = /^(01){1}\d{9}/;
    if ((!phonetext.value.match(phoneno)))
    {
        $("#errorphone").text("invalid phone Number");
    } else {
        $("#errorphone").text("");
    }

}
function validateName(nametext) {

    debugger;
    var name = /^[A-Za-z]+$/;
    if ((!nametext.value.match(name)))
    {
        $("#errorName").text("invalid name");
    } else {
        $("#errorName").text("");
    }

}

$(document).ready(() => {
    showContactCell();
    $("#save").bind("click", (e) => {
        debugger;
        add();
       

    });
    $("#add").bind("click", (e) => {
        if ($("#cancel").css("display", "none")) {
            $("#cancel").css("display", "block");
        }
        $("#cancelUpdate").css("display", "none");
        $("#back").css("display","block");

    });
    $("#back").click(() => {
        debugger;
        window.location.href = "../../templetes/day8/index.html";

    });
    $("#cancel").bind("click", (e) => {
        debugger;
        window.location.href = "../../templetes/day8/index.html";

    });
    $("#delete").bind("click", (e) => {
        debugger;
        var id = $("#delete span").attr("id");
        del(id);
        window.location.href = "../../templetes/day8/index.html";
    });
    $("#edit").bind("click", (e) => {
        debugger;
        var contactId = $("#edit span").attr("id");
        var contacts = getAll();
        var contact;
        var imgSrc;
        $("#back").css("display","none");
        contacts.forEach(con => {
            debugger;
            if (contactId == con.id) {
                contact = con;
                if (contact.gender == "Male") {
                    if (!$("#gender .ui-flipswitch").hasClass("ui-flipswitch-active")) {
                        $("#gender .ui-flipswitch").addClass("ui-flipswitch-active")
                    }
                } else {
                    if ($("#gender .ui-flipswitch").hasClass("ui-flipswitch-active")) {
                        $("#gender .ui-flipswitch").removeClass("ui-flipswitch-active")
                    }
                }
                $("#name").val(contact.name);
                $("#mail").val(contact.mail);
                $("#phone").val(contact.phone);
                $("#name").val(contact.name);
                if ($("#cancelUpdate").css("display", "none")) {
                    $("#cancel").css("display", "none");
                    $("#cancelUpdate").css("display", "block");
                }
                $("#save span").attr("id", contact.id);
            }
        });
    });
});
function openContact(e) {
    debugger;
    var contactId = $(e).attr("id");
    var contacts = getAll();
    var contact;
    var imgSrc;
    contacts.forEach(con => {
        debugger;
        if (contactId == con.id) {
            contact = con;
            if (contact.gender == "Male") {
                imgSrc = "../../static/images/male.png";
            } else {
                imgSrc = "../../static/images/female.png";
            }
            $("#genderImage").attr("src", imgSrc);
            $("#con-name").text(contact.name);
            $("#delete  span").attr("id", contact.id);
            $("#call").attr("href", "tel:" + contact.phone);
            $("#edit span").attr("id", contact.id);
        }
    });

}