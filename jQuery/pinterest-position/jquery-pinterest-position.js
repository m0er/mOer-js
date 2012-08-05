/**
 * Pinterest 스타일로 컨텐츠를 배치합니다. jQuery 셀렉터는 [컨텐츠를 감싼 래퍼, 컨텐츠들] 식으로 선언합니다.
 * 
 * 
 * 사용 예:
 *   $("#posts .row, .post").positioning();
 * 
 * Parameters:
 *   column: 컨텐츠를 몇 줄로 배치할지 결정합니다. 디폴트는 2줄 입니다.
 *   x: 엘리먼트 간의 가로 간격을 지정합니다. 디폴트는 "10 0"
 *   y: 엘리먼트 간의 세로 간격을 지정합니다. 디폴트는 "0 10"
 * 
 * Depends:
 *   jquery.js
 *   jquery.ui.core.js
 *   jquery.ui.position.js
 * 
 * Author:
 *   mOer
 *   
 */
(function ($, undefined) {
	$.fn.positioning = function(options) {
		var opts = $.extend({}, $.fn.positioning.defaults, options);
		
		var $row = this.slice(0, 1);
		var $contents = this.slice(1, this.length);
		
		positioning($row, $contents, opts);
	};
	
	function positioning($row, $contents, opts) {
		$contents.eq(0).position({of: $row, at: "left top", collision: "none", my: "left top"});
		
		// 기준이 되는 컨텐츠 부터 배치
		for (var i = 0; i < opts.column; i++)
			$contents.eq(i + 1).position({of: $contents.eq(i), at: "right top", collision: "none", my: "left top", offset: opts.x});
		
		// 나머지 컨텐츠를 기준 컨텐츠 밑으로 정렬시킴
		for (var i = 0, j = opts.column; i < $contents.size() - opts.column; i++, j++)
			$contents.eq(j).position({of: $contents.eq(i), at: "bottom", collision: "none", my: "top", offset: opts.y});
	}
	
	$.fn.positioning.defaults = {
		column: 2,
		x: "10 0",
		y: "0 10"
	};
})(jQuery);