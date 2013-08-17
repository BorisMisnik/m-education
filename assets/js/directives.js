app
	.directive('newimage', function(){
		var html = '';
		html += '<div class="root">';
		html += '<label> Добавить изображение </label>';
		html += '<input type="file" name="file" class="file" />';
		html += '<label> Описание изображения </label>';
		html += '<input type="text" name="descriptionImage" placeholder="Описание изображения"' +
				'class="descriptionImage" />';
		html += '</div>';
		return{
			restrict:'E',
			replace:true,
			transclude:true,
			template : html
		}
	})
	.directive('newquestion', function(){
		var html = '';
		html += '<div class="root">'
		html += '<label for="question"> Вопрос </label>';
		html += '<input name="question" id="question" placeholder="Вопрос"' +
				'class="input-xlarge" type="text" />';
		html += '<label> Ответ </label>';
		html += '<input name="answer" placeholder="Ответ"' +
				'class="input-xlarge answer" type="text">';
		html += '</div>';				
		return{
			restrict:'E',
			replace:true,
			transclude:true,
			template : html
		}
	})