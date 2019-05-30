Total = [["SimpleVillageois",1],["Loup-Garou",1]]

$(".img-box").click(function() {
    if (!$(this).hasClass("select")) {
        if (!$(this).hasClass("selected")) {
            $(this).addClass("selected");
            text = $(this).children("b").clone().text();
            if (text == "Loup-GarouBlanc") {
                text = "Loup-Garou Blanc";
            };
            textid = text.replace(/\s/g, '');
            rolenumber = 1;
            $(".para").append("<span id=\""+textid+"\">"+text+" : "+rolenumber+"<br/></span>");
            Total.push([textid,rolenumber]);
        } else {
            $(this).removeClass("selected");
            text = $(this).children("b").clone().text();
            textid = text.replace(/\s/g, '');
            $("#"+textid).remove();
            i = 0;
            while (i < Total.length) {
                if (textid == Total[i][0]) {
                    Total.splice(i, 1); 
                    i = Total.length
                };
                i++
            };
        };
        updateTotal();
    };
});


$(".Sub").click(function() {
    val = $(this).parents(':eq(1)').children(".role-amount").children("span");
    text = parseInt(val.text(),10);
    texta = $(this).parents(':eq(1)').children("b").clone().text();
    textid = texta.replace(/\s/g, '');
    if (text != 0) {
        text -= 1; 
        if (text == 0) {
            $(this).parents(':eq(1)').children(".role-amount").css('opacity', '0')
            $(this).parents(':eq(1)').removeClass("selected");
            $("." + textid).remove();
            i = 0;
            while (i < Total.length) {
                if (textid == Total[i][0]) {
                    Total.splice(i, 1); 
                    i = Total.length
                };
                i++
            };
        } else {
            $("." + textid).replaceWith("<span class=\""+textid+"\">"+texta+" : "+text+"<br/></span>");
            i = 0;
            while (i < Total.length) {
                if (textid == Total[i][0]) {
                    Total[i][1] -= 1;
                    i = Total.length
                };
                i++
            };
        }
        val.replaceWith("<span>"+ text +"</span>")
        updateTotal();
    };
});

$(".Add").click(function() {
    val = $(this).parents(':eq(1)').children(".role-amount").children("span");
    text = parseInt(val.text(),10);
    text += 1; 
    texta = $(this).parents(':eq(1)').children("b").clone().text();
    textid = texta.replace(/\s/g, '');
    if (text == 1) {
        $(this).parents(':eq(1)').children(".role-amount").css('opacity', '1')
        $(this).parents(':eq(1)').addClass("selected");
        $(".para").append("<span class=\""+textid+"\">"+texta+" : "+text+"<br/></span>")
        Total.push([textid,rolenumber]);
    } else {
        $("." + textid).replaceWith("<span class=\""+textid+"\">"+texta+" : "+text+"<br/></span>");
        i = 0;
            while (i < Total.length) {
                if (textid == Total[i][0]) {
                    Total[i][1] += 1;
                    i = Total.length
                };
                i++
            };
    }
    val.replaceWith("<span>"+ text +"</span>")
    updateTotal();
});

updateTotal = function(){
    Num = 0
    for (var i = 0; i < Total.length; i++) {
        Num += Total[i][1];
    };
    $(".total").children("span").replaceWith("<span>Total : "+Num+"</span>");
};