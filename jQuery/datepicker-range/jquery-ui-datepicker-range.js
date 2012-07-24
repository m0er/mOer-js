/*
 * http://jqueryui.com/demos/datepicker/#date-range 링크를 보면 jQuery UI Datepicker를 사용해서
 * 시작과 끝 날짜를 지정할 수 있게 하고 있습니다. 이 플러그인은 date range를 쉽게 만들 수 있도록 합니다.
 *
 * 먼저 두 개의 <input> 엘리먼트를 받아 각각 시작(from)과 끝(to)을 나타내는 datepicker로 만듭니다.
 * from은 to 날짜 이후를 선택할 수 없으며, to는 from 이전의 날짜를 선택할 수 없게 합니다.
 *
 * 날짜 포맷을 dateFormat 프로퍼티로 지정할 수 있습니다. 포맷에 관한 내용은 다음을 참고하세요:
 * http://docs.jquery.com/UI/Datepicker/formatDate
 * 
 * 제한사항:
 *   셀렉터에 form, to 순으로 엘리먼트를 선택해야 합니다.
 * 	 from, to 엘리먼트에 name 속성이 필요합니다.
 * 
 * 사용 예:
 * 	 $("#from, #to").datepickerRange();
 *
 *	 $(".from, .to").datepickerRange({
 *     dateFormat: "yy-mm-dd"
 *	 });
 * 
 * Depends:
 *   jquery.js
 *   jquery.ui.datepicker.js
 *
 * Author:
 *   mOer
 *
 */
(function ($, undefined) {
	$.fn.datepickerRange = function(options) {
		if (this.length % 2 != 0) throw "from, to 태그의 짝이 맞지 않습니다.";
		
		var opts = $.extend({}, $.fn.datepickerRange.defaults, options);
		
		for (var i = 0, len = this.length; i < len / 2; i++) {
			var index = i * 2;
			setRange(this.slice(index, index + 2), opts.dateFormat);
		}
	};
	
	function setRange(target, dateFormat) {
		var from = target[0].name;
		var dates = target.datepicker({
			onSelect: function(selectedDate) {						
				var option = this.name.indexOf(from) > -1 ? "minDate" : "maxDate",
					instance = $(this).data("datepicker"),
					date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);

				if (dateFormat != null) {
					dates.not(this).datepicker("option", option, date);
					dates.datepicker("option", "dateFormat", dateFormat);
				} else {
					dates.not(this).datepicker("option", option, date)
				}
			}
		});
	}

	$.fn.datepickerRange.defaults = {
		dateFormat: "yy.mm.dd"
	}
})(jQuery);