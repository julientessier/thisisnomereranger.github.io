var item = " "
function afficherSynth(listeSynth) {
    var img, tabSynth, taille, unSynth, prix, i, image;

    tabSynth = listeSynth.getElementsByTagName('synth');
    taille = tabSynth.length;
    //console.log(taille);
    for ( i = 0; i < taille; i++ ) {
        item = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">';
        unSynth = tabSynth[i];
        prix = unSynth.getElementsByTagName("price")[0].firstChild.nodeValue;
        image = unSynth.getElementsByTagName("img")[0].firstChild.nodeValue;
        brand = unSynth.getElementsByTagName("brand")[0].firstChild.nodeValue;
        name = unSynth.getElementsByTagName("name")[0].firstChild.nodeValue;
        year = unSynth.getElementsByTagName("year")[0].firstChild.nodeValue;
        item += 
        '<img src='+image+'><div class="caption"><h4><a href="#">'+brand+name+'</a></h4><h4 class="pull-left">'+prix+'</h4></div><button id='+i+' type="submit" onclick="ajouterAuPanier(id)" class="btn btn-primary">Ajouter au panier</button>';
        document.getElementById('shop').innerHTML += item;
    }

}

var listeBackup;
function chargerXML(){
	$.ajax({
	url: 'xml/productlist.xml',
	type: 'GET',
	dataType: 'xml',
	success: function(listeSynth){
		afficherSynth(listeSynth);
        listeBackup = listeSynth;
	},
	error: function() { alert('Fichier introuvable'); }
	});};

function afficheParCategorie(categorie) {
    var img, tabSynth, taille, unSynth, prix, i, image;
    //console.log(listeBackup);
    tabSynth = listeBackup.getElementsByTagName("synth");
    taille = tabSynth.length;
    //console.log(taille);
    document.getElementById('shop').innerHTML = " ";
    for ( i = 0; i < taille; i++ ) {
        if(tabSynth[i].getAttribute("category")==categorie) {
        //console.log(tabSynth[i]);
        //console.log(item);
        item = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">';
        unSynth = tabSynth[i];
        prix = unSynth.getElementsByTagName("price")[0].firstChild.nodeValue;
        image = unSynth.getElementsByTagName("img")[0].firstChild.nodeValue;
        brand = unSynth.getElementsByTagName("brand")[0].firstChild.nodeValue;
        name = unSynth.getElementsByTagName("name")[0].firstChild.nodeValue;
        year = unSynth.getElementsByTagName("year")[0].firstChild.nodeValue;
        item += 
        '<img src='+image+'><div class="caption"><h4><a href="#">'+brand+name+'</a></h4><h4 class="pull-left">'+prix+'</h4></div><button id='+i+' type="submit" onclick="ajouterAuPanier(id)" class="btn btn-primary">Ajouter au panier</button>';
        document.getElementById('shop').innerHTML += item;
        }
    }
}

function afficheParNew(categorie) {
    var img, tabSynth, taille, unSynth, prix, i, image;
    //console.log(listeBackup);
    tabSynth = listeBackup.getElementsByTagName("synth");
    taille = tabSynth.length;
    console.log(taille);
    document.getElementById('shop').innerHTML = " ";
    for ( i = 0; i < taille; i++ ) {
        if(tabSynth[i].getAttribute("new")=="true") {
        //console.log(tabSynth[i]);
        //console.log(item);
        item = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">';
        unSynth = tabSynth[i];
        prix = unSynth.getElementsByTagName("price")[0].firstChild.nodeValue;
        image = unSynth.getElementsByTagName("img")[0].firstChild.nodeValue;
        brand = unSynth.getElementsByTagName("brand")[0].firstChild.nodeValue;
        name = unSynth.getElementsByTagName("name")[0].firstChild.nodeValue;
        year = unSynth.getElementsByTagName("year")[0].firstChild.nodeValue;
        item += 
        '<img src='+image+'><div class="caption"><h4><a href="#">'+brand+name+'</a></h4><h4 class="pull-left">'+prix+'</h4></div><button id='+i+' onclick="ajouterAuPanier(id)" type="submit" class="btn btn-primary">Ajouter au panier</button>';
        document.getElementById('shop').innerHTML += item;
        }
    }
}
//ajout de la date sur le footer
var today = new Date();
document.getElementById('foot').innerHTML+=today;
//


function ajouterAuPanier(i) {
    var index = {};
    var value = [];
    if ( sessionStorage.getItem("id") != null) {
        var temp = JSON.parse(sessionStorage.getItem("id")); 
        if (temp.value != null) {
            index.value = temp.value;
            value = temp.value;
        }
    }
    
    value.push(i);
    index.value = value;
    sessionStorage.setItem("id", JSON.stringify(index));
    console.log(JSON.stringify(index));
}
//
function afficherPanier(){
    $.ajax({
	url: 'xml/productlist.xml',
	type: 'GET',
	dataType: 'xml',
	success: function(listeSynth){
        //listeBackup = listeSynth;
        //console.log(listeSynth);
        tabSynth = listeSynth.getElementsByTagName("synth");
        var index = JSON.parse(sessionStorage.getItem("id"));
        console.log(index);
    
        if(panier != undefined) {
        var taille;
        taille = index.value.length;
        tabSynth = listeSynth.getElementsByTagName("synth");
        var prixTotal = 0;
        for(i=0 ; i< taille; i++){
            item = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">';
            unSynth = tabSynth[index.value[i]];
            console.log(index.value[i]);
            console.log(unSynth);
            prix = unSynth.getElementsByTagName("price")[0].firstChild.nodeValue;
            image = unSynth.getElementsByTagName("img")[0].firstChild.nodeValue;
            brand = unSynth.getElementsByTagName("brand")[0].firstChild.nodeValue;
            name = unSynth.getElementsByTagName("name")[0].firstChild.nodeValue;
            year = unSynth.getElementsByTagName("year")[0].firstChild.nodeValue;
            prixTotal += parseInt(prix);
            item += 
            '<img src='+image+'><div class="caption"><h4><a href="#">'+brand+name+'</a></h4><h4 class="pull-left">'+prix+'</h4></div><button id='+i+' onclick="enleverDuPanier(id)" type="submit" class="btn btn-primary">Supprimer du panier</button>';
            document.getElementById('panier').innerHTML += item;
            }
            document.getElementById('facture').innerHTML = '<h3>Sous-total: '+prixTotal+'$</h3> <h3>Taxes: '+(0.15*prixTotal)+'$</h3><h2>Total: '+(prixTotal*1.15).toFixed(2)+'$</h2> ';
            document.getElementById('facture').innerHTML += '<button type="submit" class="btn btn-primary">Envoyer!</button>';
        }
	},
	error: function() { alert('Fichier introuvable'); }
	});
    
}
function enleverDuPanier(i){
    
    var index = JSON.parse(sessionStorage.getItem("id"));
    index.value.pop(i);
    sessionStorage.setItem("id", JSON.stringify(index));
    location.reload();
}
function afficherNew() {
    //console.log("hello");
    $.ajax({
	url: 'xml/productlist.xml',
	type: 'GET',
	dataType: 'xml',
	success: function(listeSynth){
        var listeBackup=listeSynth;
        var img, tabSynth, taille, unSynth, prix, i, image;
        //console.log(listeBackup);
        tabSynth = listeBackup.getElementsByTagName("synth");
        taille = tabSynth.length;
        console.log(taille);
        document.getElementById('shop').innerHTML = " ";
        for ( i = 0; i < taille; i++ ) {
            if(tabSynth[i].getAttribute("new")=="true") {
            //console.log(tabSynth[i]);
            //console.log(item);
            item = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail">';
            unSynth = tabSynth[i];
            prix = unSynth.getElementsByTagName("price")[0].firstChild.nodeValue;
            image = unSynth.getElementsByTagName("img")[0].firstChild.nodeValue;
            brand = unSynth.getElementsByTagName("brand")[0].firstChild.nodeValue;
            name = unSynth.getElementsByTagName("name")[0].firstChild.nodeValue;
            year = unSynth.getElementsByTagName("year")[0].firstChild.nodeValue;
            item += 
            '<img src='+image+'><div class="caption"><h4><a href="#">'+brand+name+'</a></h4><h4 class="pull-left">'+prix+'</h4></div><button id='+i+' onclick="ajouterAuPanier(id)" type="submit" class="btn btn-primary">Ajouter au panier</button>';
            document.getElementById('shop').innerHTML += item;
            }
    }
        }
	,
	error: function() { alert('Fichier introuvable'); }
	});}