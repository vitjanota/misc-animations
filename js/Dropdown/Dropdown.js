Inits.push(initDropdown);

function initDropdown() {
	$("#DropdownFieldImg").click(function(){
		$("#DropdownImg").slideToggle();
	});

	$("#DropdownImg div").click(function(){
		var option = $(this).children()[0];
		$("#DropdownImg").slideToggle();
		$("#DropdownFieldImgValue")[0].src = option.src;
		document.forms['myformimg'].elements['dropdown'].value = $(option).attr("data-value");
	});

	$("#DropdownFieldText").click(function(){
		$("#DropdownText").slideToggle();
	});

	$("#DropdownText div").click(function(){
		var option = $(this).children();
		$("#DropdownText").slideToggle();
		$("#DropdownFieldTextImg")[0].src = option[0].src;
		$("#DropdownFieldTextValue").html($(option[1]).html());
		document.forms['myformtxt'].elements['dropdown'].value = $(this).attr("data-value");
	});
}
