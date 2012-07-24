/*
 * textarea의 단어 수를 카운팅 합니다. 기본은 모든 문자(공백 포함)를 1글자로 취급해 단어 수를 세는 것이고,
 * 바이트 수를 세기 위해선 type: 'byte' 파라미터를 설정해야 합니다.
 * count 또는 countElement 파라미터 중 하나만 지정하면 되며, 카운팅 수를 나타낼 엘리먼트를 지정합니다.
 * 
 * 이 플러그인이 필요한 이유는 특정 브라우저에서 한글의 key 관련 이벤트가 제대로 동작하지 않기 때문입니다. 한글을
 * 사용할 경우 키 코드가 다른 버튼을 눌러도 같은 코드 값이 나온다던지, 키 관련 이벤트를 제대로 캐치하지 못한다던지
 * 하는 브라우저의 버그가 있습니다. 이 플러그인은 해당 버그를 해결하기 위한 것이며, 해결 방법으로 타이머를 지정해
 * textarea 엘리먼트의 글자 수를 업데이트 하는 방법을 사용합니다.
 * 
 * 한 번에 여러 textarea를 설정할 수 있으며, 이 경우 각각의 textarea와 count 또는 countElement가 매핑됩니다. 
 * 
 * 또한, UTF-8 또는 MS949 인코딩을 사용해야 regex 패턴이 깨지지 않습니다: 
 * <script type="text/javascript" src="/js/jquery-wordcount.js" charset="UTF-8"></script>
 * 
 * 사용 예:
 * 	$("#word_count_textarea").wordcount({
 *		count: "#word_count_span"
 *	});
 *
 *	$(this).wordcount({
 *		type: "byte",
 *		countElement: $(this).next()
 *	});
 *
 *	$("textarea").wordcount({
 *		countElement: $("span")
 *	});
 * 
 * Depends:
 * 	 jquery.js
 * 
 * Author:
 *   mOer
 * 
 */
(function ($, undefined) {
	$.fn.wordcount = function (options) {
		return this.each(function(index) {
			var opts = $.extend({}, $.fn.wordcount.defaults, options);
			opts.target = $(this);
			opts.count = opts.count == "" ? opts.countElement.eq(index) : $(opts.count).eq(index);
			var intervalId;
			
			$(this).focus(function(e) {
				intervalId = setInterval(function() {
					if (opts.type === "byte"){
						byte(opts);
					}
					else{
						count(opts);
					}
				}, opts.time);
			}).blur(function(e) {
				clearInterval(intervalId);
			});
		});
	};
	
	function count(opts) {
		opts.count.text(opts.target.val().length + match(opts.target, /\r\n/g));
	}
	
	function byte(opts) {
		var total = match(opts.target, /[^ㄱ-힣]/gi) + (match(opts.target, /[ㄱ-힣]/g) * 3);
		opts.count.text(total);
	}
	
	function match($target, pattern) {
		var inputStr = $target.val();
		var matchedChar = inputStr.match(pattern);
		return matchedChar != null ? matchedChar.length : 0;
	}
	
	$.fn.wordcount.defaults = {
		type: "word", // 글자 수(word) 또는 바이트(byte)
		count: "", // 글자 수나 바이트를 표시할 곳
		countElement: null, // 글자 수나 바이트를 표시할 곳의 실제 엘리먼트
		time: 200 // textarea 글자 수를 체크할 시간
	};
})(jQuery);