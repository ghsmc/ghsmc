var Typer = {
    text: '',
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: '',
    accessCount: 0,
    deniedCount: 0,
    init: function () {
        accessCountimer = setInterval(function () {
            Typer.updLstChr();
        }, 500);
        $.get(Typer.file, function (data) {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1);
        });
    },

    content: function () {
        return $('#console2').html();
    },

    write: function (str) {
        $('#console2').append(str);
        return false;
    },

    addText: function (key) {
        if (key.keyCode == 18) {
            Typer.accessCount++;

            if (Typer.accessCount >= 3) {
                Typer.makeAccess();
            }
        } else if (key.keyCode == 20) {
            Typer.deniedCount++;

            if (Typer.deniedCount >= 3) {
                Typer.makeDenied();
            }
        } else if (key.keyCode == 27) {
            Typer.hidepop();
        } else if (Typer.text) {
            var cont = Typer.content();
            if (cont.substring(cont.length - 1, cont.length) == '|')
                $('#console2').html(
                    $('#console2')
                        .html()
                        .substring(0, cont.length - 1),
                );
            if (key.keyCode != 8) {
                Typer.index += Typer.speed;
            } else {
                if (Typer.index > 0) Typer.index -= Typer.speed;
            }
            var text = Typer.text.substring(0, Typer.index);
            var rtn = new RegExp('\n', 'g');

            $('#console2').html(text.replace(rtn, '<br/>'));
            window.scrollBy(0, 50);
        }

        if (key.preventDefault && key.keyCode != 122) {
            key.preventDefault();
        }

        if (key.keyCode != 122) {
            // otherway prevent keys default behavior
            key.returnValue = false;
        }
    },


    updLstChr: function () {
        var cont = this.content();

        if (cont.substring(cont.length - 1, cont.length) == '|')
            $('#console2').html(
                $('#console2')
                    .html()
                    .substring(0, cont.length - 1),
            );
    },
};

function replaceUrls(text) {
    var http = text.indexOf('http://');
    var space = text.indexOf('.me ', http);

    if (space != -1) {
        var url = text.slice(http, space - 1);
        return text.replace(url, '<a href="' + url + '">' + url + '</a>');
    } else {
        return text;
    }
}

Typer.speed = 3;
Typer.file = 'terminal.txt';
Typer.init();

var timer = setInterval('t();', 30);
function t() {
    Typer.addText({ keyCode: 123748 });

    if (Typer.index > Typer.text.length) {
        clearInterval(timer);
    }
}

function inProgress() {
    alert("Hey there!\ Thanks for your interest. This project is still in progress; eventually, you'll be able to check it out. Until then, you'll just have to wait!");
}

/* potential implementation to come

function writeBlog() {
   console.log("Alright, let's begin your blog.");

   var blognumber = prompt("Blog num?");
   var day = prompt("Enter day (ex. Friday)");
   var date = prompt("Enter date (ex. May 28)");
   var time = prompt("Enter time (ex. 11:45:13)");
   var message = prompt("Enter message");
   var finaltime = prompt("Enter final time (ex. 8:34:21)");

   


}
*/ 




