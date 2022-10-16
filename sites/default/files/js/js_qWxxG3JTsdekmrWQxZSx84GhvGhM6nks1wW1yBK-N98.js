/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_mailchimp_subscription/js/custom.js. */
/*
Custom JS file for handling mailchimp related functionalities
*/

(function ($) {
  Drupal.behaviors.ge_mailchimp = {
    attach: function (context, settings) {    	  
      $("a.atcb-item-link").attr('href', function(i,a){
        var evtlink = decodeURIComponent(a);
        var sysTzone = drupalSettings.ge_mailchimp_subscription.ge_mailchimp.timezone;		 
        var etzone = $('.ir-events__field-event-timezone .field__item').html();

        if(etzone != null) {
         evtlink = evtlink.replace("e[0][timezone]=" + sysTzone, "e[0][timezone]=" + etzone);
        }

        //evtlink = encodeURIComponent(evtlink);		 
        return evtlink;
      });
      if ($('#webform-submission-ge-technical-careers-issues-add-form').length > 0) {
        $('#edit-please-select-whether-or-not-you-work-for-ge-nonge', context).click(function() {
          var url = 'https://gecorp6.custhelp.com/app/GE/careers_guide';
          window.open(url, '_blank');
        });
      }

      $("#ge-mailchimp-button", context).click(function() {
	    var emailField = $('#ge-mailchimp-email').val();
		var zipcode=$('#ge-mailchimp-zip').val();	
		var regex = /^\d{5}$/; 
			$("#ge-mailchimp-email").css('border','none');
			$("#ge-mailchimp-fname").css('border','none');
			$("#ge-mailchimp-lname").css('border','none');			
			$("#ge-mailchimp-zip").css('border','none');
			$("#ge-mailchimp-postal").css('border','none');
			$("#ge-aviation").css('border','none');
			$("#ge-healthcare").css('border','none');
			$("#ge-energy").css('border','none');
			$("#ge-mail-message .alert-dismissible").removeClass('alert-danger');
			$("#ge-mail-message .alert-dismissible .response-msg").html(''); 
				if($('#ge-mailchimp-fname').val() == '') {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter First Name.');
				  $("#ge-mailchimp-fname").css('border','1px solid red');
				  $("#ge-mailchimp-fname").focus();
				}
				else if ($('#ge-mailchimp-lname').val() == '') {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter last Name.');
				  $("#ge-mailchimp-lname").css('border','1px solid red');
				  $("#ge-mailchimp-lname").focus();
				}				
				else if ($('#ge-mailchimp-zip').val() != '' && $('#ge-mailchimp-postal').val() != '') {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter either valid US zip code or Non US postal code.');
				  $("#ge-mailchimp-zip").css('border','1px solid red');
				  $("#ge-mailchimp-zip").focus();
				}
				else if($('#ge-mailchimp-email').val() == '' || (isEmail($('#ge-mailchimp-email').val()) == false)) {
				//clear the email field message
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter a valid Email Address.');	
				  $("#ge-mailchimp-email").css('border','1px solid red');
				  $("#ge-mailchimp-email").focus();	
				}
				else if ($('#ge-mailchimp-zip').val() == '' && $('#ge-mailchimp-postal').val() == '') {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter valid US zip code or Non US postal code.');
				  $("#ge-mailchimp-zip").css('border','1px solid red');
				  $("#ge-mailchimp-zip").focus();
				}				
				else if ($('#ge-mailchimp-zip').val() != '' && (!regex.test(zipcode))) {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please enter valid zip code.');
				  $("#ge-mailchimp-zip").css('border','1px solid red');
				  $("#ge-mailchimp-zip").focus();
				}
				else if (!$('input[name=MMERGE8]').is(':checked') && !$('input[name=MMERGE10]').is(':checked') && !$('input[name=MMERGE9]').is(':checked')) {
				  $("#ge-mail-message").css("display", "block");
				  $("#ge-mail-message .alert-dismissible").addClass('alert-danger');
				  $("#ge-mail-message .alert-dismissible .response-msg").html('Please choose one among the following business.');
				  $("#ge-aviation").css('border','1px solid red');
				  $("#ge-aviation").focus();
				}
				else {
				  irsubscribe_mail();
				} 			
      });     
	  
	  function irsubscribe_mail(){	 
				var basePath = drupalSettings.ge_mailchimp_subscription.ge_mailchimp.basepath;				
		
				 if($('input[name=MMERGE8]').is(':checked')) {
					aviation = true;
				  } else {
					aviation = '';  
				  }
				  if($('input[name=MMERGE10]').is(':checked')) {
					healthcare = true;
				  } else {
					healthcare = '';  
				  }
				  if($('input[name=MMERGE9]').is(':checked')) {
					energy = true;
				  } else {
				    energy = ''; 
				  }	
				$.ajax({
					cache: false,
					type: 'POST',
					data: {
						email: $('#ge-mailchimp-email').val(),
						fname: $('#ge-mailchimp-fname').val(),
						lname: $('#ge-mailchimp-lname').val(),
						zip: $('#ge-mailchimp-zip').val(),
						MMERGE7: $('#ge-mailchimp-postal').val(),
						MMERGE8: aviation,
						MMERGE9: energy,
						MMERGE10: healthcare,
					},
					url: basePath + 'ge-mailchimp-subscribe',
					success: function (response, status) {
						console.log(response);
						var msgbox = document.getElementById("ge-mail-message");
						//msgbox.innerHTML = response;
						if(status === 'success') {
						  $("#ge-mail-message").show();
						  $("#ge-mail-message .alert-dismissible").removeClass('alert-danger');
						  $("#ge-mail-message .alert-dismissible").addClass('alert-success');
						  if ($('.alert-dismissible').length){
							$("#ge-mail-message .alert-dismissible .response-msg").html(response);
						  }
              var stringReponse = response.includes("Thanks for your subscription");
							$("#ge-mailchimp-fname").val('');
							$("#ge-mailchimp-lname").val('');
							$("#ge-mailchimp-email").val('');
							$("#ge-mailchimp-zip").val('');
							$("#ge-mailchimp-postal").val('');
							$("#ge-aviation").val('');
							$("#ge-healthcare").val('');
							$("#ge-energy").val('');
							$("#ge-mailchimp-email").focus();	
							if(stringReponse == true) {
								dataLayer.push({
									"event": "formSubmit",
									"eventCategory": "forms",
									"eventAction": "newsletter sign-up",
									"eventLabel": "sign-up successful",
									"formName": "GE Brief",
									"formMessage": response
								});
							}
							else {
								dataLayer.push({
									"event": "formSubmit",
									"eventCategory": "forms",
									"eventAction": "newsletter sign-up",
									"eventLabel": "sign-up failed",
									"formName": "GE Brief",
									"formMessage": response
								});
							}
						}
						else {
							dataLayer.push({
								'event': "formSubmit",
								'eventCategory': "forms",
								'eventAction': "newsletter sign-up",
								'eventLabel': "sign-up failed",
								'formName': "GE Brief",
								'formMessage': response
							});
						}
					}
				});	 
	        }
				
	function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }	
	  
    }
  };

})(jQuery);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_mailchimp_subscription/js/custom.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/contrib/lazy/js/lazy.js. */
/**
 * @file
 * The Lazy-load behavior.
 */

(function (Drupal) {

  'use strict';

  Drupal.behaviors.lazy = {
    attach: function (context, settings) {
      var utils = {
        extend: function (obj, src) {
          Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
          });
          return obj;
        },
        once: function (selector, context) {
          return (context || document).querySelector(selector);
        },
        loadScript: function (url) {
          if (document.querySelectorAll('script[src="' + url + '"]').length == 0) {
            var script = document.createElement('script'),
              scripts = document.getElementsByTagName('script')[0];
            script.src = url;
            script.async = true;
            scripts.parentNode.insertBefore(script, scripts);
          }
        }
      };

      if (utils.once('body', context)) {
        var lazysizes = settings.lazy.lazysizes || {};

        if (!settings.lazy.preferNative) {
          // 1. Lazysizes configuration.
          window.lazySizesConfig = window.lazySizesConfig || {};
          window.lazySizesConfig = utils.extend(window.lazySizesConfig, lazysizes);
          // 2. Load all selected lazysizes plugins.
          if (!Object.entries) {
            Object.entries = function (obj) {
              var ownProps = Object.keys(obj),
                i = ownProps.length,
                resArray = new Array(i);
              while (i--) {
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
              }
              return resArray;
            };
          }
          var min = settings.lazy.minified ? '.min' : '';
          Object.entries(lazysizes.plugins).forEach(function (path) {
            utils.loadScript(settings.lazy.libraryPath + '/plugins/' + path[1] + min + '.js');
          });
          // 3. Load the lazysizes library.
          utils.loadScript(settings.lazy.libraryPath + '/lazysizes' + min + '.js');
        }
      }
    }
  };

})(Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/contrib/lazy/js/lazy.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/debounce.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout;
  var result;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
};
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/debounce.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/displace.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = edge === 'left' || edge === 'right';
    var placement = $el.offset()[horizontal ? 'left' : 'top'];
    placement -= window["scroll".concat(horizontal ? 'X' : 'Y')] || document.documentElement["scroll".concat(horizontal ? 'Left' : 'Top')] || 0;

    switch (edge) {
      case 'top':
        displacement = placement + $el.outerHeight();
        break;

      case 'left':
        displacement = placement + $el.outerWidth();
        break;

      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;

      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;

      default:
        displacement = 0;
    }

    return displacement;
  }

  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll("[data-offset-".concat(edge, "]"));
    var n = displacingElements.length;

    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];

      if (el.style.display === 'none') {
        continue;
      }

      var displacement = parseInt(el.getAttribute("data-offset-".concat(edge)), 10);

      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }

      edgeOffset = Math.max(edgeOffset, displacement);
    }

    return edgeOffset;
  }

  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }

  function displace(broadcast) {
    offsets = calculateOffsets();
    Drupal.displace.offsets = offsets;

    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }

    return offsets;
  }

  Drupal.behaviors.drupalDisplace = {
    attach: function attach() {
      if (this.displaceProcessed) {
        return;
      }

      this.displaceProcessed = true;
      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };
  Drupal.displace = displace;
  $.extend(Drupal.displace, {
    offsets: offsets,
    calculateOffset: calculateOffset
  });
})(jQuery, Drupal, Drupal.debounce);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/displace.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/jquery.tabbable.shim.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, _ref) {
  var isTabbable = _ref.isTabbable;
  $.extend($.expr[':'], {
    tabbable: function tabbable(element) {
      Drupal.deprecationError({
        message: 'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 10.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'
      });

      if (element.tagName === 'SUMMARY' || element.tagName === 'DETAILS') {
        var tabIndex = element.getAttribute('tabIndex');

        if (tabIndex === null || tabIndex < 0) {
          return false;
        }
      }

      return isTabbable(element);
    }
  });
})(jQuery, Drupal, window.tabbable);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/jquery.tabbable.shim.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/position.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($) {
  var cachedScrollbarWidth = null;
  var max = Math.max,
      abs = Math.abs;
  var regexHorizontal = /left|center|right/;
  var regexVertical = /top|center|bottom/;
  var regexOffset = /[+-]\d+(\.[\d]+)?%?/;
  var regexPosition = /^\w+/;
  var regexPercent = /%$/;
  var _position = $.fn.position;

  function getOffsets(offsets, width, height) {
    return [parseFloat(offsets[0]) * (regexPercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (regexPercent.test(offsets[1]) ? height / 100 : 1)];
  }

  function parseCss(element, property) {
    return parseInt($.css(element, property), 10) || 0;
  }

  function getDimensions(elem) {
    var raw = elem[0];

    if (raw.nodeType === 9) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: 0,
          left: 0
        }
      };
    }

    if ($.isWindow(raw)) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: elem.scrollTop(),
          left: elem.scrollLeft()
        }
      };
    }

    if (raw.preventDefault) {
      return {
        width: 0,
        height: 0,
        offset: {
          top: raw.pageY,
          left: raw.pageX
        }
      };
    }

    return {
      width: elem.outerWidth(),
      height: elem.outerHeight(),
      offset: elem.offset()
    };
  }

  var collisions = {
    fit: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
        var outerWidth = within.width;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = withinOffset - collisionPosLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
        var newOverRight;

        if (data.collisionWidth > outerWidth) {
          if (overLeft > 0 && overRight <= 0) {
            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
            position.left += overLeft - newOverRight;
          } else if (overRight > 0 && overLeft <= 0) {
            position.left = withinOffset;
          } else if (overLeft > overRight) {
            position.left = withinOffset + outerWidth - data.collisionWidth;
          } else {
            position.left = withinOffset;
          }
        } else if (overLeft > 0) {
          position.left += overLeft;
        } else if (overRight > 0) {
          position.left -= overRight;
        } else {
          position.left = max(position.left - collisionPosLeft, position.left);
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
        var outerHeight = data.within.height;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = withinOffset - collisionPosTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
        var newOverBottom;

        if (data.collisionHeight > outerHeight) {
          if (overTop > 0 && overBottom <= 0) {
            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
            position.top += overTop - newOverBottom;
          } else if (overBottom > 0 && overTop <= 0) {
            position.top = withinOffset;
          } else if (overTop > overBottom) {
            position.top = withinOffset + outerHeight - data.collisionHeight;
          } else {
            position.top = withinOffset;
          }
        } else if (overTop > 0) {
          position.top += overTop;
        } else if (overBottom > 0) {
          position.top -= overBottom;
        } else {
          position.top = max(position.top - collisionPosTop, position.top);
        }
      }
    },
    flip: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.offset.left + within.scrollLeft;
        var outerWidth = within.width;
        var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = collisionPosLeft - offsetLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
        var myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0;
        var atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0;
        var offset = -2 * data.offset[0];
        var newOverRight;
        var newOverLeft;

        if (overLeft < 0) {
          newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;

          if (newOverRight < 0 || newOverRight < abs(overLeft)) {
            position.left += myOffset + atOffset + offset;
          }
        } else if (overRight > 0) {
          newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;

          if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
            position.left += myOffset + atOffset + offset;
          }
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.offset.top + within.scrollTop;
        var outerHeight = within.height;
        var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = collisionPosTop - offsetTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
        var top = data.my[1] === 'top';
        var myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0;
        var atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0;
        var offset = -2 * data.offset[1];
        var newOverTop;
        var newOverBottom;

        if (overTop < 0) {
          newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;

          if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
            position.top += myOffset + atOffset + offset;
          }
        } else if (overBottom > 0) {
          newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;

          if (newOverTop > 0 || abs(newOverTop) < overBottom) {
            position.top += myOffset + atOffset + offset;
          }
        }
      }
    },
    flipfit: {
      left: function left() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        collisions.flip.left.apply(this, args);
        collisions.fit.left.apply(this, args);
      },
      top: function top() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        collisions.flip.top.apply(this, args);
        collisions.fit.top.apply(this, args);
      }
    }
  };
  $.position = {
    scrollbarWidth: function scrollbarWidth() {
      if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
      }

      var div = $('<div ' + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>");
      var innerDiv = div.children()[0];
      $('body').append(div);
      var w1 = innerDiv.offsetWidth;
      div.css('overflow', 'scroll');
      var w2 = innerDiv.offsetWidth;

      if (w1 === w2) {
        w2 = div[0].clientWidth;
      }

      div.remove();
      cachedScrollbarWidth = w1 - w2;
      return cachedScrollbarWidth;
    },
    getScrollInfo: function getScrollInfo(within) {
      var overflowX = within.isWindow || within.isDocument ? '' : within.element.css('overflow-x');
      var overflowY = within.isWindow || within.isDocument ? '' : within.element.css('overflow-y');
      var hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth;
      var hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
      return {
        width: hasOverflowY ? $.position.scrollbarWidth() : 0,
        height: hasOverflowX ? $.position.scrollbarWidth() : 0
      };
    },
    getWithinInfo: function getWithinInfo(element) {
      var withinElement = $(element || window);
      var isWindow = $.isWindow(withinElement[0]);
      var isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
      var hasOffset = !isWindow && !isDocument;
      return {
        element: withinElement,
        isWindow: isWindow,
        isDocument: isDocument,
        offset: hasOffset ? $(element).offset() : {
          left: 0,
          top: 0
        },
        scrollLeft: withinElement.scrollLeft(),
        scrollTop: withinElement.scrollTop(),
        width: withinElement.outerWidth(),
        height: withinElement.outerHeight()
      };
    }
  };

  $.fn.position = function (options) {
    if (!options || !options.of) {
      return _position.apply(this, arguments);
    }

    options = $.extend({}, options);
    var within = $.position.getWithinInfo(options.within);
    var scrollInfo = $.position.getScrollInfo(within);
    var collision = (options.collision || 'flip').split(' ');
    var offsets = {};
    var target = typeof options.of === 'string' ? $(document).find(options.of) : $(options.of);
    var dimensions = getDimensions(target);
    var targetWidth = dimensions.width;
    var targetHeight = dimensions.height;
    var targetOffset = dimensions.offset;

    if (target[0].preventDefault) {
      options.at = 'left top';
    }

    var basePosition = $.extend({}, targetOffset);
    $.each(['my', 'at'], function () {
      var pos = (options[this] || '').split(' ');

      if (pos.length === 1) {
        pos = regexHorizontal.test(pos[0]) ? pos.concat(['center']) : regexVertical.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
      }

      pos[0] = regexHorizontal.test(pos[0]) ? pos[0] : 'center';
      pos[1] = regexVertical.test(pos[1]) ? pos[1] : 'center';
      var horizontalOffset = regexOffset.exec(pos[0]);
      var verticalOffset = regexOffset.exec(pos[1]);
      offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
      options[this] = [regexPosition.exec(pos[0])[0], regexPosition.exec(pos[1])[0]];
    });

    if (collision.length === 1) {
      collision[1] = collision[0];
    }

    if (options.at[0] === 'right') {
      basePosition.left += targetWidth;
    } else if (options.at[0] === 'center') {
      basePosition.left += targetWidth / 2;
    }

    if (options.at[1] === 'bottom') {
      basePosition.top += targetHeight;
    } else if (options.at[1] === 'center') {
      basePosition.top += targetHeight / 2;
    }

    var atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];
    return this.each(function () {
      var using;
      var elem = $(this);
      var elemWidth = elem.outerWidth();
      var elemHeight = elem.outerHeight();
      var marginLeft = parseCss(this, 'marginLeft');
      var marginTop = parseCss(this, 'marginTop');
      var collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width;
      var collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height;
      var position = $.extend({}, basePosition);
      var myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

      if (options.my[0] === 'right') {
        position.left -= elemWidth;
      } else if (options.my[0] === 'center') {
        position.left -= elemWidth / 2;
      }

      if (options.my[1] === 'bottom') {
        position.top -= elemHeight;
      } else if (options.my[1] === 'center') {
        position.top -= elemHeight / 2;
      }

      position.left += myOffset[0];
      position.top += myOffset[1];
      var collisionPosition = {
        marginLeft: marginLeft,
        marginTop: marginTop
      };
      $.each(['left', 'top'], function (i, dir) {
        if (collisions[collision[i]]) {
          collisions[collision[i]][dir](position, {
            targetWidth: targetWidth,
            targetHeight: targetHeight,
            elemWidth: elemWidth,
            elemHeight: elemHeight,
            collisionPosition: collisionPosition,
            collisionWidth: collisionWidth,
            collisionHeight: collisionHeight,
            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
            my: options.my,
            at: options.at,
            within: within,
            elem: elem
          });
        }
      });

      if (options.using) {
        using = function using(props) {
          var left = targetOffset.left - position.left;
          var right = left + targetWidth - elemWidth;
          var top = targetOffset.top - position.top;
          var bottom = top + targetHeight - elemHeight;
          var feedback = {
            target: {
              element: target,
              left: targetOffset.left,
              top: targetOffset.top,
              width: targetWidth,
              height: targetHeight
            },
            element: {
              element: elem,
              left: position.left,
              top: position.top,
              width: elemWidth,
              height: elemHeight
            },
            horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
            vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
          };

          if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
            feedback.horizontal = 'center';
          }

          if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
            feedback.vertical = 'middle';
          }

          if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
            feedback.important = 'horizontal';
          } else {
            feedback.important = 'vertical';
          }

          options.using.call(this, props, feedback);
        };
      }

      elem.offset($.extend(position, {
        using: using
      }));
    });
  };

  if (!$.hasOwnProperty('ui')) {
    $.ui = {};
  }

  $.ui.position = collisions;
})(jQuery);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/position.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/dialog/dialog.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  drupalSettings.dialog = {
    autoOpen: true,
    dialogClass: '',
    buttonClass: 'button',
    buttonPrimaryClass: 'button--primary',
    close: function close(event) {
      Drupal.dialog(event.target).close();
      Drupal.detachBehaviors(event.target, null, 'unload');
    }
  };

  Drupal.dialog = function (element, options) {
    var undef;
    var $element = $(element);
    var dialog = {
      open: false,
      returnValue: undef
    };

    function openDialog(settings) {
      settings = $.extend({}, drupalSettings.dialog, options, settings);
      $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
      $element.dialog(settings);
      dialog.open = true;
      $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
    }

    function closeDialog(value) {
      $(window).trigger('dialog:beforeclose', [dialog, $element]);
      $element.dialog('close');
      dialog.returnValue = value;
      dialog.open = false;
      $(window).trigger('dialog:afterclose', [dialog, $element]);
    }

    dialog.show = function () {
      openDialog({
        modal: false
      });
    };

    dialog.showModal = function () {
      openDialog({
        modal: true
      });
    };

    dialog.close = closeDialog;
    return dialog;
  };
})(jQuery, Drupal, drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/dialog/dialog.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/dialog/dialog.position.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, debounce, displace) {
  drupalSettings.dialog = $.extend({
    autoResize: true,
    maxHeight: '95%'
  }, drupalSettings.dialog);

  function resetPosition(options) {
    var offsets = displace.offsets;
    var left = offsets.left - offsets.right;
    var top = offsets.top - offsets.bottom;
    var leftString = "".concat((left > 0 ? '+' : '-') + Math.abs(Math.round(left / 2)), "px");
    var topString = "".concat((top > 0 ? '+' : '-') + Math.abs(Math.round(top / 2)), "px");
    options.position = {
      my: "center".concat(left !== 0 ? leftString : '', " center").concat(top !== 0 ? topString : ''),
      of: window
    };
    return options;
  }

  function resetSize(event) {
    var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'];
    var adjustedOptions = {};
    var windowHeight = $(window).height();
    var option;
    var optionValue;
    var adjustedValue;

    for (var n = 0; n < positionOptions.length; n++) {
      option = positionOptions[n];
      optionValue = event.data.settings[option];

      if (optionValue) {
        if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
          windowHeight -= displace.offsets.top + displace.offsets.bottom;
          adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);

          if (option === 'height' && event.data.$element.parent().outerHeight() < adjustedValue) {
            adjustedValue = 'auto';
          }

          adjustedOptions[option] = adjustedValue;
        }
      }
    }

    if (!event.data.settings.modal) {
      adjustedOptions = resetPosition(adjustedOptions);
    }

    event.data.$element.dialog('option', adjustedOptions).trigger('dialogContentResize');
  }

  $(window).on({
    'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
      var autoResize = debounce(resetSize, 20);
      var eventData = {
        settings: settings,
        $element: $element
      };

      if (settings.autoResize === true || settings.autoResize === 'true') {
        $element.dialog('option', {
          resizable: false,
          draggable: false
        }).dialog('widget').css('position', 'fixed');
        $(window).on('resize.dialogResize scroll.dialogResize', eventData, autoResize).trigger('resize.dialogResize');
        $(document).on('drupalViewportOffsetChange.dialogResize', eventData, autoResize);
      }
    },
    'dialog:beforeclose': function dialogBeforeclose(event, dialog, $element) {
      $(window).off('.dialogResize');
      $(document).off('.dialogResize');
    }
  });
})(jQuery, Drupal, drupalSettings, Drupal.debounce, Drupal.displace);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/dialog/dialog.position.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/dialog/dialog.jquery-ui.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, _ref) {
  var tabbable = _ref.tabbable,
      isTabbable = _ref.isTabbable;
  $.widget('ui.dialog', $.ui.dialog, {
    options: {
      buttonClass: 'button',
      buttonPrimaryClass: 'button--primary'
    },
    _createButtons: function _createButtons() {
      var opts = this.options;
      var primaryIndex;
      var index;
      var il = opts.buttons.length;

      for (index = 0; index < il; index++) {
        if (opts.buttons[index].primary && opts.buttons[index].primary === true) {
          primaryIndex = index;
          delete opts.buttons[index].primary;
          break;
        }
      }

      this._super();

      var $buttons = this.uiButtonSet.children().addClass(opts.buttonClass);

      if (typeof primaryIndex !== 'undefined') {
        $buttons.eq(index).addClass(opts.buttonPrimaryClass);
      }
    },
    _focusTabbable: function _focusTabbable() {
      var hasFocus = this._focusedElement ? this._focusedElement.get(0) : null;

      if (!hasFocus) {
        hasFocus = this.element.find('[autofocus]').get(0);
      }

      if (!hasFocus) {
        var $elements = [this.element, this.uiDialogButtonPane];

        for (var i = 0; i < $elements.length; i++) {
          var element = $elements[i].get(0);

          if (element) {
            var elementTabbable = tabbable(element);
            hasFocus = elementTabbable.length ? elementTabbable[0] : null;
          }

          if (hasFocus) {
            break;
          }
        }
      }

      if (!hasFocus) {
        var closeBtn = this.uiDialogTitlebarClose.get(0);
        hasFocus = closeBtn && isTabbable(closeBtn) ? closeBtn : null;
      }

      if (!hasFocus) {
        hasFocus = this.uiDialog.get(0);
      }

      $(hasFocus).eq(0).trigger('focus');
    }
  });
})(jQuery, window.tabbable);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/dialog/dialog.jquery-ui.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/core/misc/dialog/dialog.ajax.js. */
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.dialog = {
    attach: function attach(context, settings) {
      var $context = $(context);

      if (!$('#drupal-modal').length) {
        $('<div id="drupal-modal" class="ui-front"></div>').hide().appendTo('body');
      }

      var $dialog = $context.closest('.ui-dialog-content');

      if ($dialog.length) {
        if ($dialog.dialog('option', 'drupalAutoButtons')) {
          $dialog.trigger('dialogButtonsChange');
        }

        $dialog.dialog('widget').trigger('focus');
      }

      var originalClose = settings.dialog.close;

      settings.dialog.close = function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        originalClose.apply(settings.dialog, [event].concat(args));
        $(event.target).remove();
      };
    },
    prepareDialogButtons: function prepareDialogButtons($dialog) {
      var buttons = [];
      var $buttons = $dialog.find('.form-actions input[type=submit], .form-actions a.button');
      $buttons.each(function () {
        var $originalButton = $(this).css({
          display: 'none'
        });
        buttons.push({
          text: $originalButton.html() || $originalButton.attr('value'),
          class: $originalButton.attr('class'),
          click: function click(e) {
            if ($originalButton.is('a')) {
              $originalButton[0].click();
            } else {
              $originalButton.trigger('mousedown').trigger('mouseup').trigger('click');
              e.preventDefault();
            }
          }
        });
      });
      return buttons;
    }
  };

  Drupal.AjaxCommands.prototype.openDialog = function (ajax, response, status) {
    if (!response.selector) {
      return false;
    }

    var $dialog = $(response.selector);

    if (!$dialog.length) {
      $dialog = $("<div id=\"".concat(response.selector.replace(/^#/, ''), "\" class=\"ui-front\"></div>")).appendTo('body');
    }

    if (!ajax.wrapper) {
      ajax.wrapper = $dialog.attr('id');
    }

    response.command = 'insert';
    response.method = 'html';
    ajax.commands.insert(ajax, response, status);

    if (!response.dialogOptions.buttons) {
      response.dialogOptions.drupalAutoButtons = true;
      response.dialogOptions.buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
    }

    $dialog.on('dialogButtonsChange', function () {
      var buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
      $dialog.dialog('option', 'buttons', buttons);
    });
    response.dialogOptions = response.dialogOptions || {};
    var dialog = Drupal.dialog($dialog.get(0), response.dialogOptions);

    if (response.dialogOptions.modal) {
      dialog.showModal();
    } else {
      dialog.show();
    }

    $dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions');
  };

  Drupal.AjaxCommands.prototype.closeDialog = function (ajax, response, status) {
    var $dialog = $(response.selector);

    if ($dialog.length) {
      Drupal.dialog($dialog.get(0)).close();

      if (!response.persist) {
        $dialog.remove();
      }
    }

    $dialog.off('dialogButtonsChange');
  };

  Drupal.AjaxCommands.prototype.setDialogOption = function (ajax, response, status) {
    var $dialog = $(response.selector);

    if ($dialog.length) {
      $dialog.dialog('option', response.optionName, response.optionValue);
    }
  };

  $(window).on('dialog:aftercreate', function (e, dialog, $element, settings) {
    $element.on('click.dialog', '.dialog-cancel', function (e) {
      dialog.close('cancel');
      e.preventDefault();
      e.stopPropagation();
    });
  });
  $(window).on('dialog:beforeclose', function (e, dialog, $element) {
    $element.off('.dialog');
  });
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/core/misc/dialog/dialog.ajax.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/themes/custom/ge_unified/assets/js/ge_unified.script.js. */
!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(e,t,n){"use strict";n.r(t),function(e){for(var n="undefined"!=typeof window&&"undefined"!=typeof document,i=["Edge","Trident","Firefox"],r=0,o=0;o<i.length;o+=1)if(n&&navigator.userAgent.indexOf(i[o])>=0){r=1;break}var s=n&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),r))}};function a(e){return e&&"[object Function]"==={}.toString.call(e)}function l(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function c(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function u(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=l(e),n=t.overflow,i=t.overflowX,r=t.overflowY;return/(auto|scroll|overlay)/.test(n+r+i)?e:u(c(e))}var f=n&&!(!window.MSInputMethodContext||!document.documentMode),d=n&&/MSIE 10/.test(navigator.userAgent);function h(e){return 11===e?f:10===e?d:f||d}function p(e){if(!e)return document.documentElement;for(var t=h(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===l(n,"position")?p(n):n:e?e.ownerDocument.documentElement:document.documentElement}function g(e){return null!==e.parentNode?g(e.parentNode):e}function m(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?e:t,r=n?t:e,o=document.createRange();o.setStart(i,0),o.setEnd(r,0);var s,a,l=o.commonAncestorContainer;if(e!==l&&t!==l||i.contains(r))return"BODY"===(a=(s=l).nodeName)||"HTML"!==a&&p(s.firstElementChild)!==s?p(l):l;var c=g(e);return c.host?m(c.host,t):m(e,g(t).host)}function v(e){var t="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){var i=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||i)[t]}return e[t]}function y(e,t){var n="x"===t?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"],10)+parseFloat(e["border"+i+"Width"],10)}function b(e,t,n,i){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],h(10)?parseInt(n["offset"+e])+parseInt(i["margin"+("Height"===e?"Top":"Left")])+parseInt(i["margin"+("Height"===e?"Bottom":"Right")]):0)}function _(e){var t=e.body,n=e.documentElement,i=h(10)&&getComputedStyle(n);return{height:b("Height",t,n,i),width:b("Width",t,n,i)}}var w=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},E=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),T=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function x(e){return C({},e,{right:e.left+e.width,bottom:e.top+e.height})}function S(e){var t={};try{if(h(10)){t=e.getBoundingClientRect();var n=v(e,"top"),i=v(e,"left");t.top+=n,t.left+=i,t.bottom+=n,t.right+=i}else t=e.getBoundingClientRect()}catch(e){}var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},o="HTML"===e.nodeName?_(e.ownerDocument):{},s=o.width||e.clientWidth||r.right-r.left,a=o.height||e.clientHeight||r.bottom-r.top,c=e.offsetWidth-s,u=e.offsetHeight-a;if(c||u){var f=l(e);c-=y(f,"x"),u-=y(f,"y"),r.width-=c,r.height-=u}return x(r)}function D(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=h(10),r="HTML"===t.nodeName,o=S(e),s=S(t),a=u(e),c=l(t),f=parseFloat(c.borderTopWidth,10),d=parseFloat(c.borderLeftWidth,10);n&&r&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var p=x({top:o.top-s.top-f,left:o.left-s.left-d,width:o.width,height:o.height});if(p.marginTop=0,p.marginLeft=0,!i&&r){var g=parseFloat(c.marginTop,10),m=parseFloat(c.marginLeft,10);p.top-=f-g,p.bottom-=f-g,p.left-=d-m,p.right-=d-m,p.marginTop=g,p.marginLeft=m}return(i&&!n?t.contains(a):t===a&&"BODY"!==a.nodeName)&&(p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=v(t,"top"),r=v(t,"left"),o=n?-1:1;return e.top+=i*o,e.bottom+=i*o,e.left+=r*o,e.right+=r*o,e}(p,t)),p}function A(e){if(!e||!e.parentElement||h())return document.documentElement;for(var t=e.parentElement;t&&"none"===l(t,"transform");)t=t.parentElement;return t||document.documentElement}function N(e,t,n,i){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o={top:0,left:0},s=r?A(e):m(e,t);if("viewport"===i)o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,i=D(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),o=Math.max(n.clientHeight,window.innerHeight||0),s=t?0:v(n),a=t?0:v(n,"left");return x({top:s-i.top+i.marginTop,left:a-i.left+i.marginLeft,width:r,height:o})}(s,r);else{var a=void 0;"scrollParent"===i?"BODY"===(a=u(c(t))).nodeName&&(a=e.ownerDocument.documentElement):a="window"===i?e.ownerDocument.documentElement:i;var f=D(a,s,r);if("HTML"!==a.nodeName||function e(t){var n=t.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===l(t,"position"))return!0;var i=c(t);return!!i&&e(i)}(s))o=f;else{var d=_(e.ownerDocument),h=d.height,p=d.width;o.top+=f.top-f.marginTop,o.bottom=h+f.top,o.left+=f.left-f.marginLeft,o.right=p+f.left}}var g="number"==typeof(n=n||0);return o.left+=g?n:n.left||0,o.top+=g?n:n.top||0,o.right-=g?n:n.right||0,o.bottom-=g?n:n.bottom||0,o}function I(e,t,n,i,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var s=N(n,i,o,r),a={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},l=Object.keys(a).map((function(e){return C({key:e},a[e],{area:(t=a[e],t.width*t.height)});var t})).sort((function(e,t){return t.area-e.area})),c=l.filter((function(e){var t=e.width,i=e.height;return t>=n.clientWidth&&i>=n.clientHeight})),u=c.length>0?c[0].key:l[0].key,f=e.split("-")[1];return u+(f?"-"+f:"")}function k(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return D(n,i?A(t):m(t,n),i)}function O(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),i=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+i,height:e.offsetHeight+n}}function L(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function j(e,t,n){n=n.split("-")[0];var i=O(e),r={width:i.width,height:i.height},o=-1!==["right","left"].indexOf(n),s=o?"top":"left",a=o?"left":"top",l=o?"height":"width",c=o?"width":"height";return r[s]=t[s]+t[l]/2-i[l]/2,r[a]=n===a?t[a]-i[c]:t[L(a)],r}function P(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function H(e,t,n){return(void 0===n?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===n}));var i=P(e,(function(e){return e[t]===n}));return e.indexOf(i)}(e,"name",n))).forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&a(n)&&(t.offsets.popper=x(t.offsets.popper),t.offsets.reference=x(t.offsets.reference),t=n(t,e))})),t}function R(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=k(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=I(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=j(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=H(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function M(e,t){return e.some((function(e){var n=e.name;return e.enabled&&n===t}))}function q(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),i=0;i<t.length;i++){var r=t[i],o=r?""+r+n:e;if(void 0!==document.body.style[o])return o}return null}function W(){return this.state.isDestroyed=!0,M(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[q("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function F(e){var t=e.ownerDocument;return t?t.defaultView:window}function B(e,t,n,i){n.updateBound=i,F(e).addEventListener("resize",n.updateBound,{passive:!0});var r=u(e);return function e(t,n,i,r){var o="BODY"===t.nodeName,s=o?t.ownerDocument.defaultView:t;s.addEventListener(n,i,{passive:!0}),o||e(u(s.parentNode),n,i,r),r.push(s)}(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function U(){this.state.eventsEnabled||(this.state=B(this.reference,this.options,this.state,this.scheduleUpdate))}function V(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,F(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function K(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function $(e,t){Object.keys(t).forEach((function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&K(t[n])&&(i="px"),e.style[n]=t[n]+i}))}var Q=n&&/Firefox/i.test(navigator.userAgent);function z(e,t,n){var i=P(e,(function(e){return e.name===t})),r=!!i&&e.some((function(e){return e.name===n&&e.enabled&&e.order<i.order}));if(!r){var o="`"+t+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+o+" modifier in order to work, be sure to include it before "+o+"!")}return r}var Y=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],X=Y.slice(3);function G(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=X.indexOf(e),i=X.slice(n+1).concat(X.slice(0,n));return t?i.reverse():i}var J={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function Z(e,t,n,i){var r=[0,0],o=-1!==["right","left"].indexOf(i),s=e.split(/(\+|\-)/).map((function(e){return e.trim()})),a=s.indexOf(P(s,(function(e){return-1!==e.search(/,|\s/)})));s[a]&&-1===s[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==a?[s.slice(0,a).concat([s[a].split(l)[0]]),[s[a].split(l)[1]].concat(s.slice(a+1))]:[s];return(c=c.map((function(e,i){var r=(1===i?!o:o)?"height":"width",s=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,s=!0,e):s?(e[e.length-1]+=t,s=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,n,i){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+r[1],s=r[2];if(!o)return e;if(0===s.indexOf("%")){var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return x(a)[t]/100*o}if("vh"===s||"vw"===s){return("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*o}return o}(e,r,t,n)}))}))).forEach((function(e,t){e.forEach((function(n,i){K(n)&&(r[t]+=n*("-"===e[i-1]?-1:1))}))})),r}var ee={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],i=t.split("-")[1];if(i){var r=e.offsets,o=r.reference,s=r.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",u={start:T({},l,o[l]),end:T({},l,o[l]+o[c]-s[c])};e.offsets.popper=C({},s,u[i])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,i=e.placement,r=e.offsets,o=r.popper,s=r.reference,a=i.split("-")[0],l=void 0;return l=K(+n)?[+n,0]:Z(n,o,s,a),"left"===a?(o.top+=l[0],o.left-=l[1]):"right"===a?(o.top+=l[0],o.left+=l[1]):"top"===a?(o.left+=l[0],o.top-=l[1]):"bottom"===a&&(o.left+=l[0],o.top+=l[1]),e.popper=o,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||p(e.instance.popper);e.instance.reference===n&&(n=p(n));var i=q("transform"),r=e.instance.popper.style,o=r.top,s=r.left,a=r[i];r.top="",r.left="",r[i]="";var l=N(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);r.top=o,r.left=s,r[i]=a,t.boundaries=l;var c=t.priority,u=e.offsets.popper,f={primary:function(e){var n=u[e];return u[e]<l[e]&&!t.escapeWithReference&&(n=Math.max(u[e],l[e])),T({},e,n)},secondary:function(e){var n="right"===e?"left":"top",i=u[n];return u[e]>l[e]&&!t.escapeWithReference&&(i=Math.min(u[n],l[e]-("right"===e?u.width:u.height))),T({},n,i)}};return c.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";u=C({},u,f[t](e))})),e.offsets.popper=u,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,i=t.reference,r=e.placement.split("-")[0],o=Math.floor,s=-1!==["top","bottom"].indexOf(r),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<o(i[l])&&(e.offsets.popper[l]=o(i[l])-n[c]),n[l]>o(i[a])&&(e.offsets.popper[l]=o(i[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!z(e.instance.modifiers,"arrow","keepTogether"))return e;var i=t.element;if("string"==typeof i){if(!(i=e.instance.popper.querySelector(i)))return e}else if(!e.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var r=e.placement.split("-")[0],o=e.offsets,s=o.popper,a=o.reference,c=-1!==["left","right"].indexOf(r),u=c?"height":"width",f=c?"Top":"Left",d=f.toLowerCase(),h=c?"left":"top",p=c?"bottom":"right",g=O(i)[u];a[p]-g<s[d]&&(e.offsets.popper[d]-=s[d]-(a[p]-g)),a[d]+g>s[p]&&(e.offsets.popper[d]+=a[d]+g-s[p]),e.offsets.popper=x(e.offsets.popper);var m=a[d]+a[u]/2-g/2,v=l(e.instance.popper),y=parseFloat(v["margin"+f],10),b=parseFloat(v["border"+f+"Width"],10),_=m-e.offsets.popper[d]-y-b;return _=Math.max(Math.min(s[u]-g,_),0),e.arrowElement=i,e.offsets.arrow=(T(n={},d,Math.round(_)),T(n,h,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(M(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=N(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),i=e.placement.split("-")[0],r=L(i),o=e.placement.split("-")[1]||"",s=[];switch(t.behavior){case J.FLIP:s=[i,r];break;case J.CLOCKWISE:s=G(i);break;case J.COUNTERCLOCKWISE:s=G(i,!0);break;default:s=t.behavior}return s.forEach((function(a,l){if(i!==a||s.length===l+1)return e;i=e.placement.split("-")[0],r=L(i);var c=e.offsets.popper,u=e.offsets.reference,f=Math.floor,d="left"===i&&f(c.right)>f(u.left)||"right"===i&&f(c.left)<f(u.right)||"top"===i&&f(c.bottom)>f(u.top)||"bottom"===i&&f(c.top)<f(u.bottom),h=f(c.left)<f(n.left),p=f(c.right)>f(n.right),g=f(c.top)<f(n.top),m=f(c.bottom)>f(n.bottom),v="left"===i&&h||"right"===i&&p||"top"===i&&g||"bottom"===i&&m,y=-1!==["top","bottom"].indexOf(i),b=!!t.flipVariations&&(y&&"start"===o&&h||y&&"end"===o&&p||!y&&"start"===o&&g||!y&&"end"===o&&m);(d||v||b)&&(e.flipped=!0,(d||v)&&(i=s[l+1]),b&&(o=function(e){return"end"===e?"start":"start"===e?"end":e}(o)),e.placement=i+(o?"-"+o:""),e.offsets.popper=C({},e.offsets.popper,j(e.instance.popper,e.offsets.reference,e.placement)),e=H(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],i=e.offsets,r=i.popper,o=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[s?"left":"top"]=o[n]-(a?r[s?"width":"height"]:0),e.placement=L(t),e.offsets.popper=x(r),e}},hide:{order:800,enabled:!0,fn:function(e){if(!z(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=P(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,i=t.y,r=e.offsets.popper,o=P(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==o&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s=void 0!==o?o:t.gpuAcceleration,a=p(e.instance.popper),l=S(a),c={position:r.position},u=function(e,t){var n=e.offsets,i=n.popper,r=n.reference,o=Math.round,s=Math.floor,a=function(e){return e},l=o(r.width),c=o(i.width),u=-1!==["left","right"].indexOf(e.placement),f=-1!==e.placement.indexOf("-"),d=t?u||f||l%2==c%2?o:s:a,h=t?o:a;return{left:d(l%2==1&&c%2==1&&!f&&t?i.left-1:i.left),top:h(i.top),bottom:h(i.bottom),right:d(i.right)}}(e,window.devicePixelRatio<2||!Q),f="bottom"===n?"top":"bottom",d="right"===i?"left":"right",h=q("transform"),g=void 0,m=void 0;if(m="bottom"===f?"HTML"===a.nodeName?-a.clientHeight+u.bottom:-l.height+u.bottom:u.top,g="right"===d?"HTML"===a.nodeName?-a.clientWidth+u.right:-l.width+u.right:u.left,s&&h)c[h]="translate3d("+g+"px, "+m+"px, 0)",c[f]=0,c[d]=0,c.willChange="transform";else{var v="bottom"===f?-1:1,y="right"===d?-1:1;c[f]=m*v,c[d]=g*y,c.willChange=f+", "+d}var b={"x-placement":e.placement};return e.attributes=C({},b,e.attributes),e.styles=C({},c,e.styles),e.arrowStyles=C({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,n;return $(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach((function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&$(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,i,r){var o=k(r,t,e,n.positionFixed),s=I(n.placement,o,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",s),$(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},te=function(){function e(t,n){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};w(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=s(this.update.bind(this)),this.options=C({},e.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(C({},e.Defaults.modifiers,r.modifiers)).forEach((function(t){i.options.modifiers[t]=C({},e.Defaults.modifiers[t]||{},r.modifiers?r.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return C({name:e},i.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&a(e.onLoad)&&e.onLoad(i.reference,i.popper,i.options,e,i.state)})),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return E(e,[{key:"update",value:function(){return R.call(this)}},{key:"destroy",value:function(){return W.call(this)}},{key:"enableEventListeners",value:function(){return U.call(this)}},{key:"disableEventListeners",value:function(){return V.call(this)}}]),e}();te.Utils=("undefined"!=typeof window?window:e).PopperUtils,te.placements=Y,te.Defaults=ee,t.default=te}.call(this,n(3))},function(e,t,n){n(2),e.exports=n(6)},function(e,t,n){"use strict";n.r(t);n(0),n(4);!function(e){e(".navbar-expand-lg .navbar-toggler").on("click",(function(){e(this).closest("header").toggleClass("active-nav"),e("body").toggleClass("active-menuoverlay"),e(this).toggleClass("collapsed"),e(".mobile-navbar .wrap_overlay").toggleClass("show")})),e("ul.nav--list--level1 > li .active-arrow a.mobilenav-link, ul.nav--list--level1 > li .active-arrow span.mobilenav-link").click((function(t){e("ul.nav--list--level1 li").removeClass("is-active"),e(this).closest("li").find("ul").length>0&&(t.preventDefault(),e(this).closest("li").addClass("is-active"),e(this).closest("ul.nav--list--level1").addClass("is-active"),e(this).closest(".wrap_overlay").addClass("is-active"))}));var t,n=0,i=e(".header.sticky--float--header");e(window).scroll((function(){var t=e(this).scrollTop();t>250?t>n?i.removeClass("floating--header"):i.addClass("floating--header"):i.removeClass("floating--header"),n=t})),(e("ul.nav--list--level2 li a.back--btn").length?"true":"false")&&e("ul.nav--list--level2 li a.back--btn").on("click",(function(t){t.preventDefault(),e(this).closest("li.is-active").toggleClass("is-active"),e(this).closest("ul.nav--list--level1").removeClass("is-active"),e(this).closest(".wrap_overlay").removeClass("is-active")}));var r,o=e("body");function s(){var t=e(window).height()+54;e(".navbar-nav.first--level .nav-item").find(".dropdown-menu").css("height",t),e(".mobile-navbar.overlay .inner--wrapper").css("height",t-81)}e(".navbar-nav li.nav-item").on("mouseenter",(function(){e("body").addClass("menu-active"),e(".navbar-nav li.nav-item a.nav-link, .navbar-nav li.nav-item span.nav-link").css("opacity",".5"),e(this).find("a.nav-link, span.nav-link").css("opacity","1"),e(this).addClass("active"),e(this).closest(".navbar-collapse").siblings(".ge-nav-icons-desktop").addClass("in-active");var n=o[0].clientWidth-r;n+="px",e(window).scrollTop(t),e("body").css("margin-right",n),e(".header.sticky--float--header nav.ge-menu-main .container-fluid").css({"margin-right":n,transition:"0s"})})).on("mouseleave",(function(){e("body").css("margin-right","0"),e(".header.sticky--float--header nav.ge-menu-main .container-fluid").css("margin-right","0"),e("body").removeClass("menu-active"),e(".navbar-nav li.nav-item a.nav-link, .navbar-nav li.nav-item span.nav-link").css("opacity","1"),e(this).find("a.nav-link, span.nav-link").css("opacity","1"),e(this).removeClass("active"),e(this).closest(".navbar-collapse").siblings(".ge-nav-icons-desktop").removeClass("in-active")})),e(".ge-nav-icons-desktop li.nav-item").on("mouseenter",(function(){e(this).closest(".ge-nav-icons-desktop").siblings(".navbar-collapse").find("ul.first--level").addClass("in-active"),e(".ge-nav-icons-desktop li.nav-item a.nav-link").not('[id^="ge-search-component-init"]').css("opacity",".5"),e(this).find("a.nav-link").not('[id^="ge-search-component-init"]').css("opacity","1")})).on("mouseleave",(function(){e(this).closest(".ge-nav-icons-desktop").siblings(".navbar-collapse").find("ul.first--level").removeClass("in-active"),e(".ge-nav-icons-desktop li.nav-item a.nav-link").not('[id^="ge-search-component-init"]').css("opacity","1"),e(this).find("a.nav-link").not('[id^="ge-search-component-init"]').css("opacity","1")})),e(".navbar-nav li.nav-item").each((function(){e(this).on("mouseenter",(function(){e(this).find("> *").length>1?e(this).closest("ul.navbar-nav").removeClass("dd-bg-inactive",300):e(this).closest("ul.navbar-nav").addClass("dd-bg-inactive",300)}))})),s(),e(window).resize((function(){s()}));var a=e(".navbar-nav.first--level .nav-item .dropdown-menu .second--level li");function l(t){var n=new Array;e(t).each((function(){e(this).css("min-height","0"),e(this).css("max-height","none"),e(this).css("height","auto"),n.push(e(this).height())}));var i=Math.max.apply(Math,n);e(t).each((function(){e(this).css("height",i+"px")}))}a.on("mouseenter click",(function(){var t=e(".dd-content-block").height();a.find(".second-level-description").height()>t&&(t=a.find(".second-level-description").height()),e(".dd-content-block").height(t),a.find(".second-level-description").height(t)})).on("mouseleave",(function(){})),e(window).bind("load resize",(function(){var t=null,n=e(".navbar-nav.first--level .nav-item").find(".dropdown-menu").outerWidth();if(e(window).width()>=992&&(e(".toolbar-fixed a.email-icon").length?n=e(".navbar-nav.first--level .nav-item").find(".dropdown-menu").outerWidth():e("a.email-icon").length&&(n=e(".navbar-nav.first--level .nav-item").find(".dropdown-menu").outerWidth()-50)),null!==t&&window.clearTimeout(t),t=setTimeout((function(){l(e(".leadership-body .body-container ul li button")),l(e(".archive-main-wrapper ul li .ge-sidebar-links")),l(e(".card-body-leader p.caption")),l(e(".related-pages .row h4")),e(".navbar-expand-lg .navbar-nav").find(".dd-bg").outerWidth(n),o=e("body"),r=o[0].offsetWidth}),120),e("section.leadership-team")){var i="";e(".card-body-leader").each((function(t){""==i?i=e(this).height():i<e(this).height()&&(i=e(this).height())})),e(".card-body-leader").each((function(t){e(this).height(i)}))}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e(document).find(".sticky--float--header").addClass("sticky--header--hide"),e(document).find(".dd-light-mask").addClass("hide")):(e(document).find(".sticky--float--header").removeClass("sticky--header--hide"),e(document).find(".dd-light-mask").removeClass("hide"))})).resize(),e(window).bind("scroll load resize",(function(){t=e(this).scrollTop()})).resize(),e(window).resize((function(){if(e("section.leadership-team")){var t="";e(".card-body-leader").each((function(t){e(this).height("auto")})),e(".card-body-leader").each((function(n){""==t?t=e(this).height():t<e(this).height()&&(t=e(this).height())})),e(".card-body-leader").each((function(n){e(this).height(t)}))}})),e("#print-bio").click((function(){window.print()}))}(jQuery)},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){!function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),i.forEach((function(t){o(e,t,n[t])}))}return e}t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n;var a="transitionend";function l(e){var n=this,i=!1;return t(this).one(c.TRANSITION_END,(function(){i=!0})),setTimeout((function(){i||c.triggerTransitionEnd(n)}),e),this}var c={TRANSITION_END:"bsTransitionEnd",getUID:function(e){do{e+=~~(1e6*Math.random())}while(document.getElementById(e));return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target");if(!t||"#"===t){var n=e.getAttribute("href");t=n&&"#"!==n?n.trim():""}try{return document.querySelector(t)?t:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var n=t(e).css("transition-duration"),i=t(e).css("transition-delay"),r=parseFloat(n),o=parseFloat(i);return r||o?(n=n.split(",")[0],i=i.split(",")[0],1e3*(parseFloat(n)+parseFloat(i))):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(a)},supportsTransitionEnd:function(){return Boolean(a)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=t[i],s=o&&c.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(r).test(s))throw new Error(e.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'".')}var a},findShadowRoot:function(e){if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){var t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?c.findShadowRoot(e.parentNode):null}};t.fn.emulateTransitionEnd=l,t.event.special[c.TRANSITION_END]={bindType:a,delegateType:a,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}};var u=t.fn.alert,f={CLOSE:"close.bs.alert",CLOSED:"closed.bs.alert",CLICK_DATA_API:"click.bs.alert.data-api"},d="alert",h="fade",p="show",g=function(){function e(e){this._element=e}var n=e.prototype;return n.close=function(e){var t=this._element;e&&(t=this._getRootElement(e)),this._triggerCloseEvent(t).isDefaultPrevented()||this._removeElement(t)},n.dispose=function(){t.removeData(this._element,"bs.alert"),this._element=null},n._getRootElement=function(e){var n=c.getSelectorFromElement(e),i=!1;return n&&(i=document.querySelector(n)),i||(i=t(e).closest("."+d)[0]),i},n._triggerCloseEvent=function(e){var n=t.Event(f.CLOSE);return t(e).trigger(n),n},n._removeElement=function(e){var n=this;if(t(e).removeClass(p),t(e).hasClass(h)){var i=c.getTransitionDurationFromElement(e);t(e).one(c.TRANSITION_END,(function(t){return n._destroyElement(e,t)})).emulateTransitionEnd(i)}else this._destroyElement(e)},n._destroyElement=function(e){t(e).detach().trigger(f.CLOSED).remove()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.alert");r||(r=new e(this),i.data("bs.alert",r)),"close"===n&&r[n](this)}))},e._handleDismiss=function(e){return function(t){t&&t.preventDefault(),e.close(this)}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(f.CLICK_DATA_API,'[data-dismiss="alert"]',g._handleDismiss(new g)),t.fn.alert=g._jQueryInterface,t.fn.alert.Constructor=g,t.fn.alert.noConflict=function(){return t.fn.alert=u,g._jQueryInterface};var m=t.fn.button,v="active",y="btn",b="focus",_='[data-toggle^="button"]',w='[data-toggle="buttons"]',E='input:not([type="hidden"])',T=".active",C=".btn",x={CLICK_DATA_API:"click.bs.button.data-api",FOCUS_BLUR_DATA_API:"focus.bs.button.data-api blur.bs.button.data-api"},S=function(){function e(e){this._element=e}var n=e.prototype;return n.toggle=function(){var e=!0,n=!0,i=t(this._element).closest(w)[0];if(i){var r=this._element.querySelector(E);if(r){if("radio"===r.type)if(r.checked&&this._element.classList.contains(v))e=!1;else{var o=i.querySelector(T);o&&t(o).removeClass(v)}if(e){if(r.hasAttribute("disabled")||i.hasAttribute("disabled")||r.classList.contains("disabled")||i.classList.contains("disabled"))return;r.checked=!this._element.classList.contains(v),t(r).trigger("change")}r.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(v)),e&&t(this._element).toggleClass(v)},n.dispose=function(){t.removeData(this._element,"bs.button"),this._element=null},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.button");i||(i=new e(this),t(this).data("bs.button",i)),"toggle"===n&&i[n]()}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(x.CLICK_DATA_API,_,(function(e){e.preventDefault();var n=e.target;t(n).hasClass(y)||(n=t(n).closest(C)),S._jQueryInterface.call(t(n),"toggle")})).on(x.FOCUS_BLUR_DATA_API,_,(function(e){var n=t(e.target).closest(C)[0];t(n).toggleClass(b,/^focus(in)?$/.test(e.type))})),t.fn.button=S._jQueryInterface,t.fn.button.Constructor=S,t.fn.button.noConflict=function(){return t.fn.button=m,S._jQueryInterface};var D="carousel",A=".bs.carousel",N=t.fn[D],I={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},k={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},O="next",L="prev",j="left",P="right",H={SLIDE:"slide.bs.carousel",SLID:"slid.bs.carousel",KEYDOWN:"keydown.bs.carousel",MOUSEENTER:"mouseenter.bs.carousel",MOUSELEAVE:"mouseleave.bs.carousel",TOUCHSTART:"touchstart.bs.carousel",TOUCHMOVE:"touchmove.bs.carousel",TOUCHEND:"touchend.bs.carousel",POINTERDOWN:"pointerdown.bs.carousel",POINTERUP:"pointerup.bs.carousel",DRAG_START:"dragstart.bs.carousel",LOAD_DATA_API:"load.bs.carousel.data-api",CLICK_DATA_API:"click.bs.carousel.data-api"},R="carousel",M="active",q="slide",W="carousel-item-right",F="carousel-item-left",B="carousel-item-next",U="carousel-item-prev",V="pointer-event",K={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",ITEM_IMG:".carousel-item img",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},$={TOUCH:"touch",PEN:"pen"},Q=function(){function e(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(K.INDICATORS),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var n=e.prototype;return n.next=function(){this._isSliding||this._slide(O)},n.nextWhenVisible=function(){!document.hidden&&t(this._element).is(":visible")&&"hidden"!==t(this._element).css("visibility")&&this.next()},n.prev=function(){this._isSliding||this._slide(L)},n.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(K.NEXT_PREV)&&(c.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},n.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},n.to=function(e){var n=this;this._activeElement=this._element.querySelector(K.ACTIVE_ITEM);var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(H.SLID,(function(){return n.to(e)}));else{if(i===e)return this.pause(),void this.cycle();var r=e>i?O:L;this._slide(r,this._items[e])}},n.dispose=function(){t(this._element).off(A),t.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},n._getConfig=function(e){return e=s({},I,e),c.typeCheckConfig(D,e,k),e},n._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);if(!(e<=40)){var t=e/this.touchDeltaX;t>0&&this.prev(),t<0&&this.next()}},n._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(H.KEYDOWN,(function(t){return e._keydown(t)})),"hover"===this._config.pause&&t(this._element).on(H.MOUSEENTER,(function(t){return e.pause(t)})).on(H.MOUSELEAVE,(function(t){return e.cycle(t)})),this._config.touch&&this._addTouchEventListeners()},n._addTouchEventListeners=function(){var e=this;if(this._touchSupported){var n=function(t){e._pointerEvent&&$[t.originalEvent.pointerType.toUpperCase()]?e.touchStartX=t.originalEvent.clientX:e._pointerEvent||(e.touchStartX=t.originalEvent.touches[0].clientX)},i=function(t){e._pointerEvent&&$[t.originalEvent.pointerType.toUpperCase()]&&(e.touchDeltaX=t.originalEvent.clientX-e.touchStartX),e._handleSwipe(),"hover"===e._config.pause&&(e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout((function(t){return e.cycle(t)}),500+e._config.interval))};t(this._element.querySelectorAll(K.ITEM_IMG)).on(H.DRAG_START,(function(e){return e.preventDefault()})),this._pointerEvent?(t(this._element).on(H.POINTERDOWN,(function(e){return n(e)})),t(this._element).on(H.POINTERUP,(function(e){return i(e)})),this._element.classList.add(V)):(t(this._element).on(H.TOUCHSTART,(function(e){return n(e)})),t(this._element).on(H.TOUCHMOVE,(function(t){return function(t){t.originalEvent.touches&&t.originalEvent.touches.length>1?e.touchDeltaX=0:e.touchDeltaX=t.originalEvent.touches[0].clientX-e.touchStartX}(t)})),t(this._element).on(H.TOUCHEND,(function(e){return i(e)})))}},n._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},n._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(K.ITEM)):[],this._items.indexOf(e)},n._getItemByDirection=function(e,t){var n=e===O,i=e===L,r=this._getItemIndex(t),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return t;var s=(r+(e===L?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},n._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),r=this._getItemIndex(this._element.querySelector(K.ACTIVE_ITEM)),o=t.Event(H.SLIDE,{relatedTarget:e,direction:n,from:r,to:i});return t(this._element).trigger(o),o},n._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var n=[].slice.call(this._indicatorsElement.querySelectorAll(K.ACTIVE));t(n).removeClass(M);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&t(i).addClass(M)}},n._slide=function(e,n){var i,r,o,s=this,a=this._element.querySelector(K.ACTIVE_ITEM),l=this._getItemIndex(a),u=n||a&&this._getItemByDirection(e,a),f=this._getItemIndex(u),d=Boolean(this._interval);if(e===O?(i=F,r=B,o=j):(i=W,r=U,o=P),u&&t(u).hasClass(M))this._isSliding=!1;else if(!this._triggerSlideEvent(u,o).isDefaultPrevented()&&a&&u){this._isSliding=!0,d&&this.pause(),this._setActiveIndicatorElement(u);var h=t.Event(H.SLID,{relatedTarget:u,direction:o,from:l,to:f});if(t(this._element).hasClass(q)){t(u).addClass(r),c.reflow(u),t(a).addClass(i),t(u).addClass(i);var p=parseInt(u.getAttribute("data-interval"),10);p?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=p):this._config.interval=this._config.defaultInterval||this._config.interval;var g=c.getTransitionDurationFromElement(a);t(a).one(c.TRANSITION_END,(function(){t(u).removeClass(i+" "+r).addClass(M),t(a).removeClass(M+" "+r+" "+i),s._isSliding=!1,setTimeout((function(){return t(s._element).trigger(h)}),0)})).emulateTransitionEnd(g)}else t(a).removeClass(M),t(u).addClass(M),this._isSliding=!1,t(this._element).trigger(h);d&&this.cycle()}},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.carousel"),r=s({},I,t(this).data());"object"==typeof n&&(r=s({},r,n));var o="string"==typeof n?n:r.slide;if(i||(i=new e(this,r),t(this).data("bs.carousel",i)),"number"==typeof n)i.to(n);else if("string"==typeof o){if(void 0===i[o])throw new TypeError('No method named "'+o+'"');i[o]()}else r.interval&&r.ride&&(i.pause(),i.cycle())}))},e._dataApiClickHandler=function(n){var i=c.getSelectorFromElement(this);if(i){var r=t(i)[0];if(r&&t(r).hasClass(R)){var o=s({},t(r).data(),t(this).data()),a=this.getAttribute("data-slide-to");a&&(o.interval=!1),e._jQueryInterface.call(t(r),o),a&&t(r).data("bs.carousel").to(a),n.preventDefault()}}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return I}}]),e}();t(document).on(H.CLICK_DATA_API,K.DATA_SLIDE,Q._dataApiClickHandler),t(window).on(H.LOAD_DATA_API,(function(){for(var e=[].slice.call(document.querySelectorAll(K.DATA_RIDE)),n=0,i=e.length;n<i;n++){var r=t(e[n]);Q._jQueryInterface.call(r,r.data())}})),t.fn[D]=Q._jQueryInterface,t.fn[D].Constructor=Q,t.fn[D].noConflict=function(){return t.fn[D]=N,Q._jQueryInterface};var z="collapse",Y=t.fn[z],X={toggle:!0,parent:""},G={toggle:"boolean",parent:"(string|element)"},J={SHOW:"show.bs.collapse",SHOWN:"shown.bs.collapse",HIDE:"hide.bs.collapse",HIDDEN:"hidden.bs.collapse",CLICK_DATA_API:"click.bs.collapse.data-api"},Z="show",ee="collapse",te="collapsing",ne="collapsed",ie="width",re="height",oe={ACTIVES:".show, .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},se=function(){function e(e,t){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(t),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(oe.DATA_TOGGLE)),i=0,r=n.length;i<r;i++){var o=n[i],s=c.getSelectorFromElement(o),a=[].slice.call(document.querySelectorAll(s)).filter((function(t){return t===e}));null!==s&&a.length>0&&(this._selector=s,this._triggerArray.push(o))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var n=e.prototype;return n.toggle=function(){t(this._element).hasClass(Z)?this.hide():this.show()},n.show=function(){var n,i,r=this;if(!(this._isTransitioning||t(this._element).hasClass(Z)||(this._parent&&0===(n=[].slice.call(this._parent.querySelectorAll(oe.ACTIVES)).filter((function(e){return"string"==typeof r._config.parent?e.getAttribute("data-parent")===r._config.parent:e.classList.contains(ee)}))).length&&(n=null),n&&(i=t(n).not(this._selector).data("bs.collapse"))&&i._isTransitioning))){var o=t.Event(J.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){n&&(e._jQueryInterface.call(t(n).not(this._selector),"hide"),i||t(n).data("bs.collapse",null));var s=this._getDimension();t(this._element).removeClass(ee).addClass(te),this._element.style[s]=0,this._triggerArray.length&&t(this._triggerArray).removeClass(ne).attr("aria-expanded",!0),this.setTransitioning(!0);var a="scroll"+(s[0].toUpperCase()+s.slice(1)),l=c.getTransitionDurationFromElement(this._element);t(this._element).one(c.TRANSITION_END,(function(){t(r._element).removeClass(te).addClass(ee).addClass(Z),r._element.style[s]="",r.setTransitioning(!1),t(r._element).trigger(J.SHOWN)})).emulateTransitionEnd(l),this._element.style[s]=this._element[a]+"px"}}},n.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(Z)){var n=t.Event(J.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",c.reflow(this._element),t(this._element).addClass(te).removeClass(ee).removeClass(Z);var r=this._triggerArray.length;if(r>0)for(var o=0;o<r;o++){var s=this._triggerArray[o],a=c.getSelectorFromElement(s);null!==a&&(t([].slice.call(document.querySelectorAll(a))).hasClass(Z)||t(s).addClass(ne).attr("aria-expanded",!1))}this.setTransitioning(!0),this._element.style[i]="";var l=c.getTransitionDurationFromElement(this._element);t(this._element).one(c.TRANSITION_END,(function(){e.setTransitioning(!1),t(e._element).removeClass(te).addClass(ee).trigger(J.HIDDEN)})).emulateTransitionEnd(l)}}},n.setTransitioning=function(e){this._isTransitioning=e},n.dispose=function(){t.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},n._getConfig=function(e){return(e=s({},X,e)).toggle=Boolean(e.toggle),c.typeCheckConfig(z,e,G),e},n._getDimension=function(){return t(this._element).hasClass(ie)?ie:re},n._getParent=function(){var n,i=this;c.isElement(this._config.parent)?(n=this._config.parent,void 0!==this._config.parent.jquery&&(n=this._config.parent[0])):n=document.querySelector(this._config.parent);var r='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',o=[].slice.call(n.querySelectorAll(r));return t(o).each((function(t,n){i._addAriaAndCollapsedClass(e._getTargetFromElement(n),[n])})),n},n._addAriaAndCollapsedClass=function(e,n){var i=t(e).hasClass(Z);n.length&&t(n).toggleClass(ne,!i).attr("aria-expanded",i)},e._getTargetFromElement=function(e){var t=c.getSelectorFromElement(e);return t?document.querySelector(t):null},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.collapse"),o=s({},X,i.data(),"object"==typeof n&&n?n:{});if(!r&&o.toggle&&/show|hide/.test(n)&&(o.toggle=!1),r||(r=new e(this,o),i.data("bs.collapse",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return X}}]),e}();t(document).on(J.CLICK_DATA_API,oe.DATA_TOGGLE,(function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var n=t(this),i=c.getSelectorFromElement(this),r=[].slice.call(document.querySelectorAll(i));t(r).each((function(){var e=t(this),i=e.data("bs.collapse")?"toggle":n.data();se._jQueryInterface.call(e,i)}))})),t.fn[z]=se._jQueryInterface,t.fn[z].Constructor=se,t.fn[z].noConflict=function(){return t.fn[z]=Y,se._jQueryInterface};var ae="dropdown",le=t.fn[ae],ce=new RegExp("38|40|27"),ue={HIDE:"hide.bs.dropdown",HIDDEN:"hidden.bs.dropdown",SHOW:"show.bs.dropdown",SHOWN:"shown.bs.dropdown",CLICK:"click.bs.dropdown",CLICK_DATA_API:"click.bs.dropdown.data-api",KEYDOWN_DATA_API:"keydown.bs.dropdown.data-api",KEYUP_DATA_API:"keyup.bs.dropdown.data-api"},fe="disabled",de="show",he="dropup",pe="dropright",ge="dropleft",me="dropdown-menu-right",ve="position-static",ye='[data-toggle="dropdown"]',be=".dropdown form",_e=".dropdown-menu",we=".navbar-nav",Ee=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Te="top-start",Ce="top-end",xe="bottom-start",Se="bottom-end",De="right-start",Ae="left-start",Ne={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Ie={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},ke=function(){function e(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var i=e.prototype;return i.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(fe)){var i=e._getParentFromElement(this._element),r=t(this._menu).hasClass(de);if(e._clearMenus(),!r){var o={relatedTarget:this._element},s=t.Event(ue.SHOW,o);if(t(i).trigger(s),!s.isDefaultPrevented()){if(!this._inNavbar){if(void 0===n)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var a=this._element;"parent"===this._config.reference?a=i:c.isElement(this._config.reference)&&(a=this._config.reference,void 0!==this._config.reference.jquery&&(a=this._config.reference[0])),"scrollParent"!==this._config.boundary&&t(i).addClass(ve),this._popper=new n(a,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===t(i).closest(we).length&&t(document.body).children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(de),t(i).toggleClass(de).trigger(t.Event(ue.SHOWN,o))}}}},i.show=function(){if(!(this._element.disabled||t(this._element).hasClass(fe)||t(this._menu).hasClass(de))){var n={relatedTarget:this._element},i=t.Event(ue.SHOW,n),r=e._getParentFromElement(this._element);t(r).trigger(i),i.isDefaultPrevented()||(t(this._menu).toggleClass(de),t(r).toggleClass(de).trigger(t.Event(ue.SHOWN,n)))}},i.hide=function(){if(!this._element.disabled&&!t(this._element).hasClass(fe)&&t(this._menu).hasClass(de)){var n={relatedTarget:this._element},i=t.Event(ue.HIDE,n),r=e._getParentFromElement(this._element);t(r).trigger(i),i.isDefaultPrevented()||(t(this._menu).toggleClass(de),t(r).toggleClass(de).trigger(t.Event(ue.HIDDEN,n)))}},i.dispose=function(){t.removeData(this._element,"bs.dropdown"),t(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},i.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},i._addEventListeners=function(){var e=this;t(this._element).on(ue.CLICK,(function(t){t.preventDefault(),t.stopPropagation(),e.toggle()}))},i._getConfig=function(e){return e=s({},this.constructor.Default,t(this._element).data(),e),c.typeCheckConfig(ae,e,this.constructor.DefaultType),e},i._getMenuElement=function(){if(!this._menu){var t=e._getParentFromElement(this._element);t&&(this._menu=t.querySelector(_e))}return this._menu},i._getPlacement=function(){var e=t(this._element.parentNode),n=xe;return e.hasClass(he)?(n=Te,t(this._menu).hasClass(me)&&(n=Ce)):e.hasClass(pe)?n=De:e.hasClass(ge)?n=Ae:t(this._menu).hasClass(me)&&(n=Se),n},i._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},i._getOffset=function(){var e=this,t={};return"function"==typeof this._config.offset?t.fn=function(t){return t.offsets=s({},t.offsets,e._config.offset(t.offsets,e._element)||{}),t}:t.offset=this._config.offset,t},i._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(e.modifiers.applyStyle={enabled:!1}),e},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.dropdown");if(i||(i=new e(this,"object"==typeof n?n:null),t(this).data("bs.dropdown",i)),"string"==typeof n){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},e._clearMenus=function(n){if(!n||3!==n.which&&("keyup"!==n.type||9===n.which))for(var i=[].slice.call(document.querySelectorAll(ye)),r=0,o=i.length;r<o;r++){var s=e._getParentFromElement(i[r]),a=t(i[r]).data("bs.dropdown"),l={relatedTarget:i[r]};if(n&&"click"===n.type&&(l.clickEvent=n),a){var c=a._menu;if(t(s).hasClass(de)&&!(n&&("click"===n.type&&/input|textarea/i.test(n.target.tagName)||"keyup"===n.type&&9===n.which)&&t.contains(s,n.target))){var u=t.Event(ue.HIDE,l);t(s).trigger(u),u.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t(document.body).children().off("mouseover",null,t.noop),i[r].setAttribute("aria-expanded","false"),t(c).removeClass(de),t(s).removeClass(de).trigger(t.Event(ue.HIDDEN,l)))}}}},e._getParentFromElement=function(e){var t,n=c.getSelectorFromElement(e);return n&&(t=document.querySelector(n)),t||e.parentNode},e._dataApiKeydownHandler=function(n){if((/input|textarea/i.test(n.target.tagName)?!(32===n.which||27!==n.which&&(40!==n.which&&38!==n.which||t(n.target).closest(_e).length)):ce.test(n.which))&&(n.preventDefault(),n.stopPropagation(),!this.disabled&&!t(this).hasClass(fe))){var i=e._getParentFromElement(this),r=t(i).hasClass(de);if(r&&(!r||27!==n.which&&32!==n.which)){var o=[].slice.call(i.querySelectorAll(Ee));if(0!==o.length){var s=o.indexOf(n.target);38===n.which&&s>0&&s--,40===n.which&&s<o.length-1&&s++,s<0&&(s=0),o[s].focus()}}else{if(27===n.which){var a=i.querySelector(ye);t(a).trigger("focus")}t(this).trigger("click")}}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Ne}},{key:"DefaultType",get:function(){return Ie}}]),e}();t(document).on(ue.KEYDOWN_DATA_API,ye,ke._dataApiKeydownHandler).on(ue.KEYDOWN_DATA_API,_e,ke._dataApiKeydownHandler).on(ue.CLICK_DATA_API+" "+ue.KEYUP_DATA_API,ke._clearMenus).on(ue.CLICK_DATA_API,ye,(function(e){e.preventDefault(),e.stopPropagation(),ke._jQueryInterface.call(t(this),"toggle")})).on(ue.CLICK_DATA_API,be,(function(e){e.stopPropagation()})),t.fn[ae]=ke._jQueryInterface,t.fn[ae].Constructor=ke,t.fn[ae].noConflict=function(){return t.fn[ae]=le,ke._jQueryInterface};var Oe=t.fn.modal,Le={backdrop:!0,keyboard:!0,focus:!0,show:!0},je={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},Pe={HIDE:"hide.bs.modal",HIDDEN:"hidden.bs.modal",SHOW:"show.bs.modal",SHOWN:"shown.bs.modal",FOCUSIN:"focusin.bs.modal",RESIZE:"resize.bs.modal",CLICK_DISMISS:"click.dismiss.bs.modal",KEYDOWN_DISMISS:"keydown.dismiss.bs.modal",MOUSEUP_DISMISS:"mouseup.dismiss.bs.modal",MOUSEDOWN_DISMISS:"mousedown.dismiss.bs.modal",CLICK_DATA_API:"click.bs.modal.data-api"},He="modal-dialog-scrollable",Re="modal-scrollbar-measure",Me="modal-backdrop",qe="modal-open",We="fade",Fe="show",Be={DIALOG:".modal-dialog",MODAL_BODY:".modal-body",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top"},Ue=function(){function e(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(Be.DIALOG),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var n=e.prototype;return n.toggle=function(e){return this._isShown?this.hide():this.show(e)},n.show=function(e){var n=this;if(!this._isShown&&!this._isTransitioning){t(this._element).hasClass(We)&&(this._isTransitioning=!0);var i=t.Event(Pe.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(Pe.CLICK_DISMISS,Be.DATA_DISMISS,(function(e){return n.hide(e)})),t(this._dialog).on(Pe.MOUSEDOWN_DISMISS,(function(){t(n._element).one(Pe.MOUSEUP_DISMISS,(function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return n._showElement(e)})))}},n.hide=function(e){var n=this;if(e&&e.preventDefault(),this._isShown&&!this._isTransitioning){var i=t.Event(Pe.HIDE);if(t(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var r=t(this._element).hasClass(We);if(r&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),t(document).off(Pe.FOCUSIN),t(this._element).removeClass(Fe),t(this._element).off(Pe.CLICK_DISMISS),t(this._dialog).off(Pe.MOUSEDOWN_DISMISS),r){var o=c.getTransitionDurationFromElement(this._element);t(this._element).one(c.TRANSITION_END,(function(e){return n._hideModal(e)})).emulateTransitionEnd(o)}else this._hideModal()}}},n.dispose=function(){[window,this._element,this._dialog].forEach((function(e){return t(e).off(".bs.modal")})),t(document).off(Pe.FOCUSIN),t.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},n.handleUpdate=function(){this._adjustDialog()},n._getConfig=function(e){return e=s({},Le,e),c.typeCheckConfig("modal",e,je),e},n._showElement=function(e){var n=this,i=t(this._element).hasClass(We);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),t(this._dialog).hasClass(He)?this._dialog.querySelector(Be.MODAL_BODY).scrollTop=0:this._element.scrollTop=0,i&&c.reflow(this._element),t(this._element).addClass(Fe),this._config.focus&&this._enforceFocus();var r=t.Event(Pe.SHOWN,{relatedTarget:e}),o=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(r)};if(i){var s=c.getTransitionDurationFromElement(this._dialog);t(this._dialog).one(c.TRANSITION_END,o).emulateTransitionEnd(s)}else o()},n._enforceFocus=function(){var e=this;t(document).off(Pe.FOCUSIN).on(Pe.FOCUSIN,(function(n){document!==n.target&&e._element!==n.target&&0===t(e._element).has(n.target).length&&e._element.focus()}))},n._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(Pe.KEYDOWN_DISMISS,(function(t){27===t.which&&(t.preventDefault(),e.hide())})):this._isShown||t(this._element).off(Pe.KEYDOWN_DISMISS)},n._setResizeEvent=function(){var e=this;this._isShown?t(window).on(Pe.RESIZE,(function(t){return e.handleUpdate(t)})):t(window).off(Pe.RESIZE)},n._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop((function(){t(document.body).removeClass(qe),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(Pe.HIDDEN)}))},n._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},n._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(We)?We:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=Me,i&&this._backdrop.classList.add(i),t(this._backdrop).appendTo(document.body),t(this._element).on(Pe.CLICK_DISMISS,(function(e){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())})),i&&c.reflow(this._backdrop),t(this._backdrop).addClass(Fe),!e)return;if(!i)return void e();var r=c.getTransitionDurationFromElement(this._backdrop);t(this._backdrop).one(c.TRANSITION_END,e).emulateTransitionEnd(r)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(Fe);var o=function(){n._removeBackdrop(),e&&e()};if(t(this._element).hasClass(We)){var s=c.getTransitionDurationFromElement(this._backdrop);t(this._backdrop).one(c.TRANSITION_END,o).emulateTransitionEnd(s)}else o()}else e&&e()},n._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},n._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},n._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},n._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){var n=[].slice.call(document.querySelectorAll(Be.FIXED_CONTENT)),i=[].slice.call(document.querySelectorAll(Be.STICKY_CONTENT));t(n).each((function(n,i){var r=i.style.paddingRight,o=t(i).css("padding-right");t(i).data("padding-right",r).css("padding-right",parseFloat(o)+e._scrollbarWidth+"px")})),t(i).each((function(n,i){var r=i.style.marginRight,o=t(i).css("margin-right");t(i).data("margin-right",r).css("margin-right",parseFloat(o)-e._scrollbarWidth+"px")}));var r=document.body.style.paddingRight,o=t(document.body).css("padding-right");t(document.body).data("padding-right",r).css("padding-right",parseFloat(o)+this._scrollbarWidth+"px")}t(document.body).addClass(qe)},n._resetScrollbar=function(){var e=[].slice.call(document.querySelectorAll(Be.FIXED_CONTENT));t(e).each((function(e,n){var i=t(n).data("padding-right");t(n).removeData("padding-right"),n.style.paddingRight=i||""}));var n=[].slice.call(document.querySelectorAll(""+Be.STICKY_CONTENT));t(n).each((function(e,n){var i=t(n).data("margin-right");void 0!==i&&t(n).css("margin-right",i).removeData("margin-right")}));var i=t(document.body).data("padding-right");t(document.body).removeData("padding-right"),document.body.style.paddingRight=i||""},n._getScrollbarWidth=function(){var e=document.createElement("div");e.className=Re,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},e._jQueryInterface=function(n,i){return this.each((function(){var r=t(this).data("bs.modal"),o=s({},Le,t(this).data(),"object"==typeof n&&n?n:{});if(r||(r=new e(this,o),t(this).data("bs.modal",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n](i)}else o.show&&r.show(i)}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Le}}]),e}();t(document).on(Pe.CLICK_DATA_API,Be.DATA_TOGGLE,(function(e){var n,i=this,r=c.getSelectorFromElement(this);r&&(n=document.querySelector(r));var o=t(n).data("bs.modal")?"toggle":s({},t(n).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var a=t(n).one(Pe.SHOW,(function(e){e.isDefaultPrevented()||a.one(Pe.HIDDEN,(function(){t(i).is(":visible")&&i.focus()}))}));Ue._jQueryInterface.call(t(n),o,this)})),t.fn.modal=Ue._jQueryInterface,t.fn.modal.Constructor=Ue,t.fn.modal.noConflict=function(){return t.fn.modal=Oe,Ue._jQueryInterface};var Ve=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Ke={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},$e=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,Qe=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function ze(e,t,n){if(0===e.length)return e;if(n&&"function"==typeof n)return n(e);for(var i=(new window.DOMParser).parseFromString(e,"text/html"),r=Object.keys(t),o=[].slice.call(i.body.querySelectorAll("*")),s=function(e,n){var i=o[e],s=i.nodeName.toLowerCase();if(-1===r.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var a=[].slice.call(i.attributes),l=[].concat(t["*"]||[],t[s]||[]);a.forEach((function(e){(function(e,t){var n=e.nodeName.toLowerCase();if(-1!==t.indexOf(n))return-1===Ve.indexOf(n)||Boolean(e.nodeValue.match($e)||e.nodeValue.match(Qe));for(var i=t.filter((function(e){return e instanceof RegExp})),r=0,o=i.length;r<o;r++)if(n.match(i[r]))return!0;return!1})(e,l)||i.removeAttribute(e.nodeName)}))},a=0,l=o.length;a<l;a++)s(a);return i.body.innerHTML}var Ye="tooltip",Xe=t.fn.tooltip,Ge=new RegExp("(^|\\s)bs-tooltip\\S+","g"),Je=["sanitize","whiteList","sanitizeFn"],Ze={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object"},et={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},tt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:Ke},nt="show",it="out",rt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},ot="fade",st="show",at=".tooltip-inner",lt=".arrow",ct="hover",ut="focus",ft="click",dt="manual",ht=function(){function e(e,t){if(void 0===n)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}var i=e.prototype;return i.enable=function(){this._isEnabled=!0},i.disable=function(){this._isEnabled=!1},i.toggleEnabled=function(){this._isEnabled=!this._isEnabled},i.toggle=function(e){if(this._isEnabled)if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(st))return void this._leave(null,this);this._enter(null,this)}},i.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},i.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var i=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(i);var r=c.findShadowRoot(this.element),o=t.contains(null!==r?r:this.element.ownerDocument.documentElement,this.element);if(i.isDefaultPrevented()||!o)return;var s=this.getTipElement(),a=c.getUID(this.constructor.NAME);s.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&t(s).addClass(ot);var l="function"==typeof this.config.placement?this.config.placement.call(this,s,this.element):this.config.placement,u=this._getAttachment(l);this.addAttachmentClass(u);var f=this._getContainer();t(s).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(s).appendTo(f),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new n(this.element,s,{placement:u,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:lt},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}}),t(s).addClass(st),"ontouchstart"in document.documentElement&&t(document.body).children().on("mouseover",null,t.noop);var d=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===it&&e._leave(null,e)};if(t(this.tip).hasClass(ot)){var h=c.getTransitionDurationFromElement(this.tip);t(this.tip).one(c.TRANSITION_END,d).emulateTransitionEnd(h)}else d()}},i.hide=function(e){var n=this,i=this.getTipElement(),r=t.Event(this.constructor.Event.HIDE),o=function(){n._hoverState!==nt&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};if(t(this.element).trigger(r),!r.isDefaultPrevented()){if(t(i).removeClass(st),"ontouchstart"in document.documentElement&&t(document.body).children().off("mouseover",null,t.noop),this._activeTrigger[ft]=!1,this._activeTrigger[ut]=!1,this._activeTrigger[ct]=!1,t(this.tip).hasClass(ot)){var s=c.getTransitionDurationFromElement(i);t(i).one(c.TRANSITION_END,o).emulateTransitionEnd(s)}else o();this._hoverState=""}},i.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},i.isWithContent=function(){return Boolean(this.getTitle())},i.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},i.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},i.setContent=function(){var e=this.getTipElement();this.setElementContent(t(e.querySelectorAll(at)),this.getTitle()),t(e).removeClass(ot+" "+st)},i.setElementContent=function(e,n){"object"!=typeof n||!n.nodeType&&!n.jquery?this.config.html?(this.config.sanitize&&(n=ze(n,this.config.whiteList,this.config.sanitizeFn)),e.html(n)):e.text(n):this.config.html?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text())},i.getTitle=function(){var e=this.element.getAttribute("data-original-title");return e||(e="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),e},i._getOffset=function(){var e=this,t={};return"function"==typeof this.config.offset?t.fn=function(t){return t.offsets=s({},t.offsets,e.config.offset(t.offsets,e.element)||{}),t}:t.offset=this.config.offset,t},i._getContainer=function(){return!1===this.config.container?document.body:c.isElement(this.config.container)?t(this.config.container):t(document).find(this.config.container)},i._getAttachment=function(e){return et[e.toUpperCase()]},i._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach((function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,(function(t){return e.toggle(t)}));else if(n!==dt){var i=n===ct?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,r=n===ct?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,(function(t){return e._enter(t)})).on(r,e.config.selector,(function(t){return e._leave(t)}))}})),t(this.element).closest(".modal").on("hide.bs.modal",(function(){e.element&&e.hide()})),this.config.selector?this.config=s({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},i._fixTitle=function(){var e=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==e)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},i._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?ut:ct]=!0),t(n.getTipElement()).hasClass(st)||n._hoverState===nt?n._hoverState=nt:(clearTimeout(n._timeout),n._hoverState=nt,n.config.delay&&n.config.delay.show?n._timeout=setTimeout((function(){n._hoverState===nt&&n.show()}),n.config.delay.show):n.show())},i._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?ut:ct]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=it,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout((function(){n._hoverState===it&&n.hide()}),n.config.delay.hide):n.hide())},i._isWithActiveTrigger=function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},i._getConfig=function(e){var n=t(this.element).data();return Object.keys(n).forEach((function(e){-1!==Je.indexOf(e)&&delete n[e]})),"number"==typeof(e=s({},this.constructor.Default,n,"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),c.typeCheckConfig(Ye,e,this.constructor.DefaultType),e.sanitize&&(e.template=ze(e.template,e.whiteList,e.sanitizeFn)),e},i._getDelegateConfig=function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e},i._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(Ge);null!==n&&n.length&&e.removeClass(n.join(""))},i._handlePopperPlacementChange=function(e){var t=e.instance;this.tip=t.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))},i._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(ot),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.tooltip"),r="object"==typeof n&&n;if((i||!/dispose|hide/.test(n))&&(i||(i=new e(this,r),t(this).data("bs.tooltip",i)),"string"==typeof n)){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return tt}},{key:"NAME",get:function(){return Ye}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return rt}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return Ze}}]),e}();t.fn.tooltip=ht._jQueryInterface,t.fn.tooltip.Constructor=ht,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=Xe,ht._jQueryInterface};var pt="popover",gt=t.fn.popover,mt=new RegExp("(^|\\s)bs-popover\\S+","g"),vt=s({},ht.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),yt=s({},ht.DefaultType,{content:"(string|element|function)"}),bt="fade",_t="show",wt=".popover-header",Et=".popover-body",Tt={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},Ct=function(e){var n,i;function o(){return e.apply(this,arguments)||this}i=e,(n=o).prototype=Object.create(i.prototype),n.prototype.constructor=n,n.__proto__=i;var s=o.prototype;return s.isWithContent=function(){return this.getTitle()||this._getContent()},s.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-popover-"+e)},s.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},s.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(wt),this.getTitle());var n=this._getContent();"function"==typeof n&&(n=n.call(this.element)),this.setElementContent(e.find(Et),n),e.removeClass(bt+" "+_t)},s._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},s._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(mt);null!==n&&n.length>0&&e.removeClass(n.join(""))},o._jQueryInterface=function(e){return this.each((function(){var n=t(this).data("bs.popover"),i="object"==typeof e?e:null;if((n||!/dispose|hide/.test(e))&&(n||(n=new o(this,i),t(this).data("bs.popover",n)),"string"==typeof e)){if(void 0===n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},r(o,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return vt}},{key:"NAME",get:function(){return pt}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return Tt}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return yt}}]),o}(ht);t.fn.popover=Ct._jQueryInterface,t.fn.popover.Constructor=Ct,t.fn.popover.noConflict=function(){return t.fn.popover=gt,Ct._jQueryInterface};var xt="scrollspy",St=t.fn[xt],Dt={offset:10,method:"auto",target:""},At={offset:"number",method:"string",target:"(string|element)"},Nt={ACTIVATE:"activate.bs.scrollspy",SCROLL:"scroll.bs.scrollspy",LOAD_DATA_API:"load.bs.scrollspy.data-api"},It="dropdown-item",kt="active",Ot={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",NAV_LIST_GROUP:".nav, .list-group",NAV_LINKS:".nav-link",NAV_ITEMS:".nav-item",LIST_ITEMS:".list-group-item",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},Lt="offset",jt="position",Pt=function(){function e(e,n){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+Ot.NAV_LINKS+","+this._config.target+" "+Ot.LIST_ITEMS+","+this._config.target+" "+Ot.DROPDOWN_ITEMS,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(Nt.SCROLL,(function(e){return i._process(e)})),this.refresh(),this._process()}var n=e.prototype;return n.refresh=function(){var e=this,n=this._scrollElement===this._scrollElement.window?Lt:jt,i="auto"===this._config.method?n:this._config.method,r=i===jt?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(e){var n,o=c.getSelectorFromElement(e);if(o&&(n=document.querySelector(o)),n){var s=n.getBoundingClientRect();if(s.width||s.height)return[t(n)[i]().top+r,o]}return null})).filter((function(e){return e})).sort((function(e,t){return e[0]-t[0]})).forEach((function(t){e._offsets.push(t[0]),e._targets.push(t[1])}))},n.dispose=function(){t.removeData(this._element,"bs.scrollspy"),t(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},n._getConfig=function(e){if("string"!=typeof(e=s({},Dt,"object"==typeof e&&e?e:{})).target){var n=t(e.target).attr("id");n||(n=c.getUID(xt),t(e.target).attr("id",n)),e.target="#"+n}return c.typeCheckConfig(xt,e,At),e},n._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},n._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},n._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},n._process=function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),n=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),e>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&e<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var r=this._offsets.length;r--;)this._activeTarget!==this._targets[r]&&e>=this._offsets[r]&&(void 0===this._offsets[r+1]||e<this._offsets[r+1])&&this._activate(this._targets[r])}},n._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",").map((function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'})),i=t([].slice.call(document.querySelectorAll(n.join(","))));i.hasClass(It)?(i.closest(Ot.DROPDOWN).find(Ot.DROPDOWN_TOGGLE).addClass(kt),i.addClass(kt)):(i.addClass(kt),i.parents(Ot.NAV_LIST_GROUP).prev(Ot.NAV_LINKS+", "+Ot.LIST_ITEMS).addClass(kt),i.parents(Ot.NAV_LIST_GROUP).prev(Ot.NAV_ITEMS).children(Ot.NAV_LINKS).addClass(kt)),t(this._scrollElement).trigger(Nt.ACTIVATE,{relatedTarget:e})},n._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(e){return e.classList.contains(kt)})).forEach((function(e){return e.classList.remove(kt)}))},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.scrollspy");if(i||(i=new e(this,"object"==typeof n&&n),t(this).data("bs.scrollspy",i)),"string"==typeof n){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Dt}}]),e}();t(window).on(Nt.LOAD_DATA_API,(function(){for(var e=[].slice.call(document.querySelectorAll(Ot.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);Pt._jQueryInterface.call(i,i.data())}})),t.fn[xt]=Pt._jQueryInterface,t.fn[xt].Constructor=Pt,t.fn[xt].noConflict=function(){return t.fn[xt]=St,Pt._jQueryInterface};var Ht=t.fn.tab,Rt={HIDE:"hide.bs.tab",HIDDEN:"hidden.bs.tab",SHOW:"show.bs.tab",SHOWN:"shown.bs.tab",CLICK_DATA_API:"click.bs.tab.data-api"},Mt="dropdown-menu",qt="active",Wt="disabled",Ft="fade",Bt="show",Ut=".dropdown",Vt=".nav, .list-group",Kt=".active",$t="> li > .active",Qt='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',zt=".dropdown-toggle",Yt="> .dropdown-menu .active",Xt=function(){function e(e){this._element=e}var n=e.prototype;return n.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(qt)||t(this._element).hasClass(Wt))){var n,i,r=t(this._element).closest(Vt)[0],o=c.getSelectorFromElement(this._element);if(r){var s="UL"===r.nodeName||"OL"===r.nodeName?$t:Kt;i=(i=t.makeArray(t(r).find(s)))[i.length-1]}var a=t.Event(Rt.HIDE,{relatedTarget:this._element}),l=t.Event(Rt.SHOW,{relatedTarget:i});if(i&&t(i).trigger(a),t(this._element).trigger(l),!l.isDefaultPrevented()&&!a.isDefaultPrevented()){o&&(n=document.querySelector(o)),this._activate(this._element,r);var u=function(){var n=t.Event(Rt.HIDDEN,{relatedTarget:e._element}),r=t.Event(Rt.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e._element).trigger(r)};n?this._activate(n,n.parentNode,u):u()}}},n.dispose=function(){t.removeData(this._element,"bs.tab"),this._element=null},n._activate=function(e,n,i){var r=this,o=(!n||"UL"!==n.nodeName&&"OL"!==n.nodeName?t(n).children(Kt):t(n).find($t))[0],s=i&&o&&t(o).hasClass(Ft),a=function(){return r._transitionComplete(e,o,i)};if(o&&s){var l=c.getTransitionDurationFromElement(o);t(o).removeClass(Bt).one(c.TRANSITION_END,a).emulateTransitionEnd(l)}else a()},n._transitionComplete=function(e,n,i){if(n){t(n).removeClass(qt);var r=t(n.parentNode).find(Yt)[0];r&&t(r).removeClass(qt),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}if(t(e).addClass(qt),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),c.reflow(e),e.classList.contains(Ft)&&e.classList.add(Bt),e.parentNode&&t(e.parentNode).hasClass(Mt)){var o=t(e).closest(Ut)[0];if(o){var s=[].slice.call(o.querySelectorAll(zt));t(s).addClass(qt)}e.setAttribute("aria-expanded",!0)}i&&i()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.tab");if(r||(r=new e(this),i.data("bs.tab",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(Rt.CLICK_DATA_API,Qt,(function(e){e.preventDefault(),Xt._jQueryInterface.call(t(this),"show")})),t.fn.tab=Xt._jQueryInterface,t.fn.tab.Constructor=Xt,t.fn.tab.noConflict=function(){return t.fn.tab=Ht,Xt._jQueryInterface};var Gt=t.fn.toast,Jt={CLICK_DISMISS:"click.dismiss.bs.toast",HIDE:"hide.bs.toast",HIDDEN:"hidden.bs.toast",SHOW:"show.bs.toast",SHOWN:"shown.bs.toast"},Zt="fade",en="hide",tn="show",nn="showing",rn={animation:"boolean",autohide:"boolean",delay:"number"},on={animation:!0,autohide:!0,delay:500},sn='[data-dismiss="toast"]',an=function(){function e(e,t){this._element=e,this._config=this._getConfig(t),this._timeout=null,this._setListeners()}var n=e.prototype;return n.show=function(){var e=this;t(this._element).trigger(Jt.SHOW),this._config.animation&&this._element.classList.add(Zt);var n=function(){e._element.classList.remove(nn),e._element.classList.add(tn),t(e._element).trigger(Jt.SHOWN),e._config.autohide&&e.hide()};if(this._element.classList.remove(en),this._element.classList.add(nn),this._config.animation){var i=c.getTransitionDurationFromElement(this._element);t(this._element).one(c.TRANSITION_END,n).emulateTransitionEnd(i)}else n()},n.hide=function(e){var n=this;this._element.classList.contains(tn)&&(t(this._element).trigger(Jt.HIDE),e?this._close():this._timeout=setTimeout((function(){n._close()}),this._config.delay))},n.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(tn)&&this._element.classList.remove(tn),t(this._element).off(Jt.CLICK_DISMISS),t.removeData(this._element,"bs.toast"),this._element=null,this._config=null},n._getConfig=function(e){return e=s({},on,t(this._element).data(),"object"==typeof e&&e?e:{}),c.typeCheckConfig("toast",e,this.constructor.DefaultType),e},n._setListeners=function(){var e=this;t(this._element).on(Jt.CLICK_DISMISS,sn,(function(){return e.hide(!0)}))},n._close=function(){var e=this,n=function(){e._element.classList.add(en),t(e._element).trigger(Jt.HIDDEN)};if(this._element.classList.remove(tn),this._config.animation){var i=c.getTransitionDurationFromElement(this._element);t(this._element).one(c.TRANSITION_END,n).emulateTransitionEnd(i)}else n()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.toast");if(r||(r=new e(this,"object"==typeof n&&n),i.data("bs.toast",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n](this)}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"DefaultType",get:function(){return rn}},{key:"Default",get:function(){return on}}]),e}();t.fn.toast=an._jQueryInterface,t.fn.toast.Constructor=an,t.fn.toast.noConflict=function(){return t.fn.toast=Gt,an._jQueryInterface},function(){if(void 0===t)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),e.Util=c,e.Alert=g,e.Button=S,e.Carousel=Q,e.Collapse=se,e.Dropdown=ke,e.Modal=Ue,e.Popover=Ct,e.Scrollspy=Pt,e.Tab=Xt,e.Toast=an,e.Tooltip=ht,Object.defineProperty(e,"__esModule",{value:!0})}(t,n(5),n(0))},function(e,t,n){var i;!function(t,n){"use strict";"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:this,(function(n,r){"use strict";var o=[],s=n.document,a=Object.getPrototypeOf,l=o.slice,c=o.concat,u=o.push,f=o.indexOf,d={},h=d.toString,p=d.hasOwnProperty,g=p.toString,m=g.call(Object),v={},y=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},b=function(e){return null!=e&&e===e.window},_={type:!0,src:!0,nonce:!0,noModule:!0};function w(e,t,n){var i,r,o=(n=n||s).createElement("script");if(o.text=e,t)for(i in _)(r=t[i]||t.getAttribute&&t.getAttribute(i))&&o.setAttribute(i,r);n.head.appendChild(o).parentNode.removeChild(o)}function E(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?d[h.call(e)]||"object":typeof e}var T=function(e,t){return new T.fn.init(e,t)},C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function x(e){var t=!!e&&"length"in e&&e.length,n=E(e);return!y(e)&&!b(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}T.fn=T.prototype={jquery:"3.4.1",constructor:T,length:0,toArray:function(){return l.call(this)},get:function(e){return null==e?l.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=T.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return T.each(this,e)},map:function(e){return this.pushStack(T.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(l.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:o.sort,splice:o.splice},T.extend=T.fn.extend=function(){var e,t,n,i,r,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||y(s)||(s={}),a===l&&(s=this,a--);a<l;a++)if(null!=(e=arguments[a]))for(t in e)i=e[t],"__proto__"!==t&&s!==i&&(c&&i&&(T.isPlainObject(i)||(r=Array.isArray(i)))?(n=s[t],o=r&&!Array.isArray(n)?[]:r||T.isPlainObject(n)?n:{},r=!1,s[t]=T.extend(c,o,i)):void 0!==i&&(s[t]=i));return s},T.extend({expando:"jQuery"+("3.4.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==h.call(e))&&(!(t=a(e))||"function"==typeof(n=p.call(t,"constructor")&&t.constructor)&&g.call(n)===m)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){w(e,{nonce:t&&t.nonce})},each:function(e,t){var n,i=0;if(x(e))for(n=e.length;i<n&&!1!==t.call(e[i],i,e[i]);i++);else for(i in e)if(!1===t.call(e[i],i,e[i]))break;return e},trim:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(x(Object(e))?T.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:f.call(t,e,n)},merge:function(e,t){for(var n=+t.length,i=0,r=e.length;i<n;i++)e[r++]=t[i];return e.length=r,e},grep:function(e,t,n){for(var i=[],r=0,o=e.length,s=!n;r<o;r++)!t(e[r],r)!==s&&i.push(e[r]);return i},map:function(e,t,n){var i,r,o=0,s=[];if(x(e))for(i=e.length;o<i;o++)null!=(r=t(e[o],o,n))&&s.push(r);else for(o in e)null!=(r=t(e[o],o,n))&&s.push(r);return c.apply([],s)},guid:1,support:v}),"function"==typeof Symbol&&(T.fn[Symbol.iterator]=o[Symbol.iterator]),T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){d["[object "+t+"]"]=t.toLowerCase()}));var S=function(e){var t,n,i,r,o,s,a,l,c,u,f,d,h,p,g,m,v,y,b,_="sizzle"+1*new Date,w=e.document,E=0,T=0,C=le(),x=le(),S=le(),D=le(),A=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,I=[],k=I.pop,O=I.push,L=I.push,j=I.slice,P=function(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},H="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",R="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",q="\\["+R+"*("+M+")(?:"+R+"*([*^$|!~]?=)"+R+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+R+"*\\]",W=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+q+")*)|.*)\\)|)",F=new RegExp(R+"+","g"),B=new RegExp("^"+R+"+|((?:^|[^\\\\])(?:\\\\.)*)"+R+"+$","g"),U=new RegExp("^"+R+"*,"+R+"*"),V=new RegExp("^"+R+"*([>+~]|"+R+")"+R+"*"),K=new RegExp(R+"|>"),$=new RegExp(W),Q=new RegExp("^"+M+"$"),z={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+q),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+R+"*(even|odd|(([+-]|)(\\d*)n|)"+R+"*(?:([+-]|)"+R+"*(\\d+)|))"+R+"*\\)|)","i"),bool:new RegExp("^(?:"+H+")$","i"),needsContext:new RegExp("^"+R+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+R+"*((?:-\\d)?\\d*)"+R+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,X=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,J=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+R+"?|("+R+")|.)","ig"),ne=function(e,t,n){var i="0x"+t-65536;return i!=i||n?t:i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},ie=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,re=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){d()},se=_e((function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()}),{dir:"parentNode",next:"legend"});try{L.apply(I=j.call(w.childNodes),w.childNodes),I[w.childNodes.length].nodeType}catch(e){L={apply:I.length?function(e,t){O.apply(e,j.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}function ae(e,t,i,r){var o,a,c,u,f,p,v,y=t&&t.ownerDocument,E=t?t.nodeType:9;if(i=i||[],"string"!=typeof e||!e||1!==E&&9!==E&&11!==E)return i;if(!r&&((t?t.ownerDocument||t:w)!==h&&d(t),t=t||h,g)){if(11!==E&&(f=Z.exec(e)))if(o=f[1]){if(9===E){if(!(c=t.getElementById(o)))return i;if(c.id===o)return i.push(c),i}else if(y&&(c=y.getElementById(o))&&b(t,c)&&c.id===o)return i.push(c),i}else{if(f[2])return L.apply(i,t.getElementsByTagName(e)),i;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(i,t.getElementsByClassName(o)),i}if(n.qsa&&!D[e+" "]&&(!m||!m.test(e))&&(1!==E||"object"!==t.nodeName.toLowerCase())){if(v=e,y=t,1===E&&K.test(e)){for((u=t.getAttribute("id"))?u=u.replace(ie,re):t.setAttribute("id",u=_),a=(p=s(e)).length;a--;)p[a]="#"+u+" "+be(p[a]);v=p.join(","),y=ee.test(e)&&ve(t.parentNode)||t}try{return L.apply(i,y.querySelectorAll(v)),i}catch(t){D(e,!0)}finally{u===_&&t.removeAttribute("id")}}}return l(e.replace(B,"$1"),t,i,r)}function le(){var e=[];return function t(n,r){return e.push(n+" ")>i.cacheLength&&delete t[e.shift()],t[n+" "]=r}}function ce(e){return e[_]=!0,e}function ue(e){var t=h.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){for(var n=e.split("|"),r=n.length;r--;)i.attrHandle[n[r]]=t}function de(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function he(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ge(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&se(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function me(e){return ce((function(t){return t=+t,ce((function(n,i){for(var r,o=e([],n.length,t),s=o.length;s--;)n[r=o[s]]&&(n[r]=!(i[r]=n[r]))}))}))}function ve(e){return e&&void 0!==e.getElementsByTagName&&e}for(t in n=ae.support={},o=ae.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},d=ae.setDocument=function(e){var t,r,s=e?e.ownerDocument||e:w;return s!==h&&9===s.nodeType&&s.documentElement?(p=(h=s).documentElement,g=!o(h),w!==h&&(r=h.defaultView)&&r.top!==r&&(r.addEventListener?r.addEventListener("unload",oe,!1):r.attachEvent&&r.attachEvent("onunload",oe)),n.attributes=ue((function(e){return e.className="i",!e.getAttribute("className")})),n.getElementsByTagName=ue((function(e){return e.appendChild(h.createComment("")),!e.getElementsByTagName("*").length})),n.getElementsByClassName=J.test(h.getElementsByClassName),n.getById=ue((function(e){return p.appendChild(e).id=_,!h.getElementsByName||!h.getElementsByName(_).length})),n.getById?(i.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},i.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(i.filter.ID=function(e){var t=e.replace(te,ne);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},i.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n,i,r,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];for(r=t.getElementsByName(e),i=0;o=r[i++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),i.find.TAG=n.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],r=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[r++];)1===n.nodeType&&i.push(n);return i}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],m=[],(n.qsa=J.test(h.querySelectorAll))&&(ue((function(e){p.appendChild(e).innerHTML="<a id='"+_+"'></a><select id='"+_+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+R+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||m.push("\\["+R+"*(?:value|"+H+")"),e.querySelectorAll("[id~="+_+"-]").length||m.push("~="),e.querySelectorAll(":checked").length||m.push(":checked"),e.querySelectorAll("a#"+_+"+*").length||m.push(".#.+[+~]")})),ue((function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=h.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&m.push("name"+R+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),p.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),m.push(",.*:")}))),(n.matchesSelector=J.test(y=p.matches||p.webkitMatchesSelector||p.mozMatchesSelector||p.oMatchesSelector||p.msMatchesSelector))&&ue((function(e){n.disconnectedMatch=y.call(e,"*"),y.call(e,"[s!='']:x"),v.push("!=",W)})),m=m.length&&new RegExp(m.join("|")),v=v.length&&new RegExp(v.join("|")),t=J.test(p.compareDocumentPosition),b=t||J.test(p.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode;return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},A=t?function(e,t){if(e===t)return f=!0,0;var i=!e.compareDocumentPosition-!t.compareDocumentPosition;return i||(1&(i=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===i?e===h||e.ownerDocument===w&&b(w,e)?-1:t===h||t.ownerDocument===w&&b(w,t)?1:u?P(u,e)-P(u,t):0:4&i?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,i=0,r=e.parentNode,o=t.parentNode,s=[e],a=[t];if(!r||!o)return e===h?-1:t===h?1:r?-1:o?1:u?P(u,e)-P(u,t):0;if(r===o)return de(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)a.unshift(n);for(;s[i]===a[i];)i++;return i?de(s[i],a[i]):s[i]===w?-1:a[i]===w?1:0},h):h},ae.matches=function(e,t){return ae(e,null,null,t)},ae.matchesSelector=function(e,t){if((e.ownerDocument||e)!==h&&d(e),n.matchesSelector&&g&&!D[t+" "]&&(!v||!v.test(t))&&(!m||!m.test(t)))try{var i=y.call(e,t);if(i||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(e){D(t,!0)}return ae(t,h,null,[e]).length>0},ae.contains=function(e,t){return(e.ownerDocument||e)!==h&&d(e),b(e,t)},ae.attr=function(e,t){(e.ownerDocument||e)!==h&&d(e);var r=i.attrHandle[t.toLowerCase()],o=r&&N.call(i.attrHandle,t.toLowerCase())?r(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},ae.escape=function(e){return(e+"").replace(ie,re)},ae.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ae.uniqueSort=function(e){var t,i=[],r=0,o=0;if(f=!n.detectDuplicates,u=!n.sortStable&&e.slice(0),e.sort(A),f){for(;t=e[o++];)t===e[o]&&(r=i.push(o));for(;r--;)e.splice(i[r],1)}return u=null,e},r=ae.getText=function(e){var t,n="",i=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=r(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[i++];)n+=r(t);return n},(i=ae.selectors={cacheLength:50,createPseudo:ce,match:z,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ae.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ae.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return z.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&$.test(n)&&(t=s(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=new RegExp("(^|"+R+")"+e+"("+R+"|$)"))&&C(e,(function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(i){var r=ae.attr(i,e);return null==r?"!="===t:!t||(r+="","="===t?r===n:"!="===t?r!==n:"^="===t?n&&0===r.indexOf(n):"*="===t?n&&r.indexOf(n)>-1:"$="===t?n&&r.slice(-n.length)===n:"~="===t?(" "+r.replace(F," ")+" ").indexOf(n)>-1:"|="===t&&(r===n||r.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,i,r){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===i&&0===r?function(e){return!!e.parentNode}:function(t,n,l){var c,u,f,d,h,p,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!l&&!a,b=!1;if(m){if(o){for(;g;){for(d=t;d=d[g];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;p=g="only"===e&&!p&&"nextSibling"}return!0}if(p=[s?m.firstChild:m.lastChild],s&&y){for(b=(h=(c=(u=(f=(d=m)[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===E&&c[1])&&c[2],d=h&&m.childNodes[h];d=++h&&d&&d[g]||(b=h=0)||p.pop();)if(1===d.nodeType&&++b&&d===t){u[e]=[E,h,b];break}}else if(y&&(b=h=(c=(u=(f=(d=t)[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===E&&c[1]),!1===b)for(;(d=++h&&d&&d[g]||(b=h=0)||p.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(y&&((u=(f=d[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]=[E,b]),d!==t)););return(b-=r)===i||b%i==0&&b/i>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ae.error("unsupported pseudo: "+e);return r[_]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ce((function(e,n){for(var i,o=r(e,t),s=o.length;s--;)e[i=P(e,o[s])]=!(n[i]=o[s])})):function(e){return r(e,0,n)}):r}},pseudos:{not:ce((function(e){var t=[],n=[],i=a(e.replace(B,"$1"));return i[_]?ce((function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))})):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}})),has:ce((function(e){return function(t){return ae(e,t).length>0}})),contains:ce((function(e){return e=e.replace(te,ne),function(t){return(t.textContent||r(t)).indexOf(e)>-1}})),lang:ce((function(e){return Q.test(e||"")||ae.error("unsupported lang: "+e),e=e.replace(te,ne).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===p},focus:function(e){return e===h.activeElement&&(!h.hasFocus||h.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return G.test(e.nodeName)},input:function(e){return X.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:me((function(){return[0]})),last:me((function(e,t){return[t-1]})),eq:me((function(e,t,n){return[n<0?n+t:n]})),even:me((function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e})),odd:me((function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e})),lt:me((function(e,t,n){for(var i=n<0?n+t:n>t?t:n;--i>=0;)e.push(i);return e})),gt:me((function(e,t,n){for(var i=n<0?n+t:n;++i<t;)e.push(i);return e}))}}).pseudos.nth=i.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=he(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=pe(t);function ye(){}function be(e){for(var t=0,n=e.length,i="";t<n;t++)i+=e[t].value;return i}function _e(e,t,n){var i=t.dir,r=t.next,o=r||i,s=n&&"parentNode"===o,a=T++;return t.first?function(t,n,r){for(;t=t[i];)if(1===t.nodeType||s)return e(t,n,r);return!1}:function(t,n,l){var c,u,f,d=[E,a];if(l){for(;t=t[i];)if((1===t.nodeType||s)&&e(t,n,l))return!0}else for(;t=t[i];)if(1===t.nodeType||s)if(u=(f=t[_]||(t[_]={}))[t.uniqueID]||(f[t.uniqueID]={}),r&&r===t.nodeName.toLowerCase())t=t[i]||t;else{if((c=u[o])&&c[0]===E&&c[1]===a)return d[2]=c[2];if(u[o]=d,d[2]=e(t,n,l))return!0}return!1}}function we(e){return e.length>1?function(t,n,i){for(var r=e.length;r--;)if(!e[r](t,n,i))return!1;return!0}:e[0]}function Ee(e,t,n,i,r){for(var o,s=[],a=0,l=e.length,c=null!=t;a<l;a++)(o=e[a])&&(n&&!n(o,i,r)||(s.push(o),c&&t.push(a)));return s}function Te(e,t,n,i,r,o){return i&&!i[_]&&(i=Te(i)),r&&!r[_]&&(r=Te(r,o)),ce((function(o,s,a,l){var c,u,f,d=[],h=[],p=s.length,g=o||function(e,t,n){for(var i=0,r=t.length;i<r;i++)ae(e,t[i],n);return n}(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:Ee(g,d,e,a,l),v=n?r||(o?e:p||i)?[]:s:m;if(n&&n(m,v,a,l),i)for(c=Ee(v,h),i(c,[],a,l),u=c.length;u--;)(f=c[u])&&(v[h[u]]=!(m[h[u]]=f));if(o){if(r||e){if(r){for(c=[],u=v.length;u--;)(f=v[u])&&c.push(m[u]=f);r(null,v=[],c,l)}for(u=v.length;u--;)(f=v[u])&&(c=r?P(o,f):d[u])>-1&&(o[c]=!(s[c]=f))}}else v=Ee(v===s?v.splice(p,v.length):v),r?r(null,s,v,l):L.apply(s,v)}))}function Ce(e){for(var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,u=_e((function(e){return e===t}),a,!0),f=_e((function(e){return P(t,e)>-1}),a,!0),d=[function(e,n,i){var r=!s&&(i||n!==c)||((t=n).nodeType?u(e,n,i):f(e,n,i));return t=null,r}];l<o;l++)if(n=i.relative[e[l].type])d=[_e(we(d),n)];else{if((n=i.filter[e[l].type].apply(null,e[l].matches))[_]){for(r=++l;r<o&&!i.relative[e[r].type];r++);return Te(l>1&&we(d),l>1&&be(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(B,"$1"),n,l<r&&Ce(e.slice(l,r)),r<o&&Ce(e=e.slice(r)),r<o&&be(e))}d.push(n)}return we(d)}return ye.prototype=i.filters=i.pseudos,i.setFilters=new ye,s=ae.tokenize=function(e,t){var n,r,o,s,a,l,c,u=x[e+" "];if(u)return t?0:u.slice(0);for(a=e,l=[],c=i.preFilter;a;){for(s in n&&!(r=U.exec(a))||(r&&(a=a.slice(r[0].length)||a),l.push(o=[])),n=!1,(r=V.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),i.filter)!(r=z[s].exec(a))||c[s]&&!(r=c[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ae.error(e):x(e,l).slice(0)},a=ae.compile=function(e,t){var n,r=[],o=[],a=S[e+" "];if(!a){for(t||(t=s(e)),n=t.length;n--;)(a=Ce(t[n]))[_]?r.push(a):o.push(a);(a=S(e,function(e,t){var n=t.length>0,r=e.length>0,o=function(o,s,a,l,u){var f,p,m,v=0,y="0",b=o&&[],_=[],w=c,T=o||r&&i.find.TAG("*",u),C=E+=null==w?1:Math.random()||.1,x=T.length;for(u&&(c=s===h||s||u);y!==x&&null!=(f=T[y]);y++){if(r&&f){for(p=0,s||f.ownerDocument===h||(d(f),a=!g);m=e[p++];)if(m(f,s||h,a)){l.push(f);break}u&&(E=C)}n&&((f=!m&&f)&&v--,o&&b.push(f))}if(v+=y,n&&y!==v){for(p=0;m=t[p++];)m(b,_,s,a);if(o){if(v>0)for(;y--;)b[y]||_[y]||(_[y]=k.call(l));_=Ee(_)}L.apply(l,_),u&&!o&&_.length>0&&v+t.length>1&&ae.uniqueSort(l)}return u&&(E=C,c=w),b};return n?ce(o):o}(o,r))).selector=e}return a},l=ae.select=function(e,t,n,r){var o,l,c,u,f,d="function"==typeof e&&e,h=!r&&s(e=d.selector||e);if(n=n||[],1===h.length){if((l=h[0]=h[0].slice(0)).length>2&&"ID"===(c=l[0]).type&&9===t.nodeType&&g&&i.relative[l[1].type]){if(!(t=(i.find.ID(c.matches[0].replace(te,ne),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(l.shift().value.length)}for(o=z.needsContext.test(e)?0:l.length;o--&&(c=l[o],!i.relative[u=c.type]);)if((f=i.find[u])&&(r=f(c.matches[0].replace(te,ne),ee.test(l[0].type)&&ve(t.parentNode)||t))){if(l.splice(o,1),!(e=r.length&&be(l)))return L.apply(n,r),n;break}}return(d||a(e,h))(r,t,!g,n,!t||ee.test(e)&&ve(t.parentNode)||t),n},n.sortStable=_.split("").sort(A).join("")===_,n.detectDuplicates=!!f,d(),n.sortDetached=ue((function(e){return 1&e.compareDocumentPosition(h.createElement("fieldset"))})),ue((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||fe("type|href|height|width",(function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),n.attributes&&ue((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||fe("value",(function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue})),ue((function(e){return null==e.getAttribute("disabled")}))||fe(H,(function(e,t,n){var i;if(!n)return!0===e[t]?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null})),ae}(n);T.find=S,T.expr=S.selectors,T.expr[":"]=T.expr.pseudos,T.uniqueSort=T.unique=S.uniqueSort,T.text=S.getText,T.isXMLDoc=S.isXML,T.contains=S.contains,T.escapeSelector=S.escape;var D=function(e,t,n){for(var i=[],r=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(r&&T(e).is(n))break;i.push(e)}return i},A=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=T.expr.match.needsContext;function I(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var k=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function O(e,t,n){return y(t)?T.grep(e,(function(e,i){return!!t.call(e,i,e)!==n})):t.nodeType?T.grep(e,(function(e){return e===t!==n})):"string"!=typeof t?T.grep(e,(function(e){return f.call(t,e)>-1!==n})):T.filter(t,e,n)}T.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?T.find.matchesSelector(i,e)?[i]:[]:T.find.matches(e,T.grep(t,(function(e){return 1===e.nodeType})))},T.fn.extend({find:function(e){var t,n,i=this.length,r=this;if("string"!=typeof e)return this.pushStack(T(e).filter((function(){for(t=0;t<i;t++)if(T.contains(r[t],this))return!0})));for(n=this.pushStack([]),t=0;t<i;t++)T.find(e,r[t],n);return i>1?T.uniqueSort(n):n},filter:function(e){return this.pushStack(O(this,e||[],!1))},not:function(e){return this.pushStack(O(this,e||[],!0))},is:function(e){return!!O(this,"string"==typeof e&&N.test(e)?T(e):e||[],!1).length}});var L,j=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(T.fn.init=function(e,t,n){var i,r;if(!e)return this;if(n=n||L,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:j.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof T?t[0]:t,T.merge(this,T.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:s,!0)),k.test(i[1])&&T.isPlainObject(t))for(i in t)y(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(r=s.getElementById(i[2]))&&(this[0]=r,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):y(e)?void 0!==n.ready?n.ready(e):e(T):T.makeArray(e,this)}).prototype=T.fn,L=T(s);var P=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function R(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}T.fn.extend({has:function(e){var t=T(e,this),n=t.length;return this.filter((function(){for(var e=0;e<n;e++)if(T.contains(this,t[e]))return!0}))},closest:function(e,t){var n,i=0,r=this.length,o=[],s="string"!=typeof e&&T(e);if(!N.test(e))for(;i<r;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&T.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?T.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?f.call(T(e),this[0]):f.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(T.uniqueSort(T.merge(this.get(),T(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),T.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return D(e,"parentNode")},parentsUntil:function(e,t,n){return D(e,"parentNode",n)},next:function(e){return R(e,"nextSibling")},prev:function(e){return R(e,"previousSibling")},nextAll:function(e){return D(e,"nextSibling")},prevAll:function(e){return D(e,"previousSibling")},nextUntil:function(e,t,n){return D(e,"nextSibling",n)},prevUntil:function(e,t,n){return D(e,"previousSibling",n)},siblings:function(e){return A((e.parentNode||{}).firstChild,e)},children:function(e){return A(e.firstChild)},contents:function(e){return void 0!==e.contentDocument?e.contentDocument:(I(e,"template")&&(e=e.content||e),T.merge([],e.childNodes))}},(function(e,t){T.fn[e]=function(n,i){var r=T.map(this,t,n);return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(r=T.filter(i,r)),this.length>1&&(H[e]||T.uniqueSort(r),P.test(e)&&r.reverse()),this.pushStack(r)}}));var M=/[^\x20\t\r\n\f]+/g;function q(e){return e}function W(e){throw e}function F(e,t,n,i){var r;try{e&&y(r=e.promise)?r.call(e).done(t).fail(n):e&&y(r=e.then)?r.call(e,t,n):t.apply(void 0,[e].slice(i))}catch(e){n.apply(void 0,[e])}}T.Callbacks=function(e){e="string"==typeof e?function(e){var t={};return T.each(e.match(M)||[],(function(e,n){t[n]=!0})),t}(e):T.extend({},e);var t,n,i,r,o=[],s=[],a=-1,l=function(){for(r=r||e.once,i=t=!0;s.length;a=-1)for(n=s.shift();++a<o.length;)!1===o[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=o.length,n=!1);e.memory||(n=!1),t=!1,r&&(o=n?[]:"")},c={add:function(){return o&&(n&&!t&&(a=o.length-1,s.push(n)),function t(n){T.each(n,(function(n,i){y(i)?e.unique&&c.has(i)||o.push(i):i&&i.length&&"string"!==E(i)&&t(i)}))}(arguments),n&&!t&&l()),this},remove:function(){return T.each(arguments,(function(e,t){for(var n;(n=T.inArray(t,o,n))>-1;)o.splice(n,1),n<=a&&a--})),this},has:function(e){return e?T.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return r=s=[],o=n="",this},disabled:function(){return!o},lock:function(){return r=s=[],n||t||(o=n=""),this},locked:function(){return!!r},fireWith:function(e,n){return r||(n=[e,(n=n||[]).slice?n.slice():n],s.push(n),t||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},T.extend({Deferred:function(e){var t=[["notify","progress",T.Callbacks("memory"),T.Callbacks("memory"),2],["resolve","done",T.Callbacks("once memory"),T.Callbacks("once memory"),0,"resolved"],["reject","fail",T.Callbacks("once memory"),T.Callbacks("once memory"),1,"rejected"]],i="pending",r={state:function(){return i},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return r.then(null,e)},pipe:function(){var e=arguments;return T.Deferred((function(n){T.each(t,(function(t,i){var r=y(e[i[4]])&&e[i[4]];o[i[1]]((function(){var e=r&&r.apply(this,arguments);e&&y(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[i[0]+"With"](this,r?[e]:arguments)}))})),e=null})).promise()},then:function(e,i,r){var o=0;function s(e,t,i,r){return function(){var a=this,l=arguments,c=function(){var n,c;if(!(e<o)){if((n=i.apply(a,l))===t.promise())throw new TypeError("Thenable self-resolution");c=n&&("object"==typeof n||"function"==typeof n)&&n.then,y(c)?r?c.call(n,s(o,t,q,r),s(o,t,W,r)):(o++,c.call(n,s(o,t,q,r),s(o,t,W,r),s(o,t,q,t.notifyWith))):(i!==q&&(a=void 0,l=[n]),(r||t.resolveWith)(a,l))}},u=r?c:function(){try{c()}catch(n){T.Deferred.exceptionHook&&T.Deferred.exceptionHook(n,u.stackTrace),e+1>=o&&(i!==W&&(a=void 0,l=[n]),t.rejectWith(a,l))}};e?u():(T.Deferred.getStackHook&&(u.stackTrace=T.Deferred.getStackHook()),n.setTimeout(u))}}return T.Deferred((function(n){t[0][3].add(s(0,n,y(r)?r:q,n.notifyWith)),t[1][3].add(s(0,n,y(e)?e:q)),t[2][3].add(s(0,n,y(i)?i:W))})).promise()},promise:function(e){return null!=e?T.extend(e,r):r}},o={};return T.each(t,(function(e,n){var s=n[2],a=n[5];r[n[1]]=s.add,a&&s.add((function(){i=a}),t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),s.add(n[3].fire),o[n[0]]=function(){return o[n[0]+"With"](this===o?void 0:this,arguments),this},o[n[0]+"With"]=s.fireWith})),r.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,i=Array(n),r=l.call(arguments),o=T.Deferred(),s=function(e){return function(n){i[e]=this,r[e]=arguments.length>1?l.call(arguments):n,--t||o.resolveWith(i,r)}};if(t<=1&&(F(e,o.done(s(n)).resolve,o.reject,!t),"pending"===o.state()||y(r[n]&&r[n].then)))return o.then();for(;n--;)F(r[n],s(n),o.reject);return o.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;T.Deferred.exceptionHook=function(e,t){n.console&&n.console.warn&&e&&B.test(e.name)&&n.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},T.readyException=function(e){n.setTimeout((function(){throw e}))};var U=T.Deferred();function V(){s.removeEventListener("DOMContentLoaded",V),n.removeEventListener("load",V),T.ready()}T.fn.ready=function(e){return U.then(e).catch((function(e){T.readyException(e)})),this},T.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--T.readyWait:T.isReady)||(T.isReady=!0,!0!==e&&--T.readyWait>0||U.resolveWith(s,[T]))}}),T.ready.then=U.then,"complete"===s.readyState||"loading"!==s.readyState&&!s.documentElement.doScroll?n.setTimeout(T.ready):(s.addEventListener("DOMContentLoaded",V),n.addEventListener("load",V));var K=function(e,t,n,i,r,o,s){var a=0,l=e.length,c=null==n;if("object"===E(n))for(a in r=!0,n)K(e,t,a,n[a],!0,o,s);else if(void 0!==i&&(r=!0,y(i)||(s=!0),c&&(s?(t.call(e,i),t=null):(c=t,t=function(e,t,n){return c.call(T(e),n)})),t))for(;a<l;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)));return r?e:c?t.call(e):l?t(e[0],n):o},$=/^-ms-/,Q=/-([a-z])/g;function z(e,t){return t.toUpperCase()}function Y(e){return e.replace($,"ms-").replace(Q,z)}var X=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=T.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},X(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var i,r=this.cache(e);if("string"==typeof t)r[Y(t)]=n;else for(i in t)r[Y(i)]=t[i];return r},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][Y(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i=e[this.expando];if(void 0!==i){if(void 0!==t){n=(t=Array.isArray(t)?t.map(Y):(t=Y(t))in i?[t]:t.match(M)||[]).length;for(;n--;)delete i[t[n]]}(void 0===t||T.isEmptyObject(i))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!T.isEmptyObject(t)}};var J=new G,Z=new G,ee=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,te=/[A-Z]/g;function ne(e,t,n){var i;if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(te,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(i))){try{n=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:ee.test(e)?JSON.parse(e):e)}(n)}catch(e){}Z.set(e,t,n)}else n=void 0;return n}T.extend({hasData:function(e){return Z.hasData(e)||J.hasData(e)},data:function(e,t,n){return Z.access(e,t,n)},removeData:function(e,t){Z.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),T.fn.extend({data:function(e,t){var n,i,r,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(r=Z.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&0===(i=s[n].name).indexOf("data-")&&(i=Y(i.slice(5)),ne(o,i,r[i]));J.set(o,"hasDataAttrs",!0)}return r}return"object"==typeof e?this.each((function(){Z.set(this,e)})):K(this,(function(t){var n;if(o&&void 0===t)return void 0!==(n=Z.get(o,e))?n:void 0!==(n=ne(o,e))?n:void 0;this.each((function(){Z.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){Z.remove(this,e)}))}}),T.extend({queue:function(e,t,n){var i;if(e)return t=(t||"fx")+"queue",i=J.get(e,t),n&&(!i||Array.isArray(n)?i=J.access(e,t,T.makeArray(n)):i.push(n)),i||[]},dequeue:function(e,t){t=t||"fx";var n=T.queue(e,t),i=n.length,r=n.shift(),o=T._queueHooks(e,t);"inprogress"===r&&(r=n.shift(),i--),r&&("fx"===t&&n.unshift("inprogress"),delete o.stop,r.call(e,(function(){T.dequeue(e,t)}),o)),!i&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:T.Callbacks("once memory").add((function(){J.remove(e,[t+"queue",n])}))})}}),T.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?T.queue(this[0],e):void 0===t?this:this.each((function(){var n=T.queue(this,e,t);T._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&T.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){T.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,r=T.Deferred(),o=this,s=this.length,a=function(){--i||r.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=J.get(o[s],e+"queueHooks"))&&n.empty&&(i++,n.empty.add(a));return a(),r.promise(t)}});var ie=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,re=new RegExp("^(?:([+-])=|)("+ie+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],se=s.documentElement,ae=function(e){return T.contains(e.ownerDocument,e)},le={composed:!0};se.getRootNode&&(ae=function(e){return T.contains(e.ownerDocument,e)||e.getRootNode(le)===e.ownerDocument});var ce=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ae(e)&&"none"===T.css(e,"display")},ue=function(e,t,n,i){var r,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];for(o in r=n.apply(e,i||[]),t)e.style[o]=s[o];return r};function fe(e,t,n,i){var r,o,s=20,a=i?function(){return i.cur()}:function(){return T.css(e,t,"")},l=a(),c=n&&n[3]||(T.cssNumber[t]?"":"px"),u=e.nodeType&&(T.cssNumber[t]||"px"!==c&&+l)&&re.exec(T.css(e,t));if(u&&u[3]!==c){for(l/=2,c=c||u[3],u=+l||1;s--;)T.style(e,t,u+c),(1-o)*(1-(o=a()/l||.5))<=0&&(s=0),u/=o;u*=2,T.style(e,t,u+c),n=n||[]}return n&&(u=+u||+l||0,r=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=u,i.end=r)),r}var de={};function he(e){var t,n=e.ownerDocument,i=e.nodeName,r=de[i];return r||(t=n.body.appendChild(n.createElement(i)),r=T.css(t,"display"),t.parentNode.removeChild(t),"none"===r&&(r="block"),de[i]=r,r)}function pe(e,t){for(var n,i,r=[],o=0,s=e.length;o<s;o++)(i=e[o]).style&&(n=i.style.display,t?("none"===n&&(r[o]=J.get(i,"display")||null,r[o]||(i.style.display="")),""===i.style.display&&ce(i)&&(r[o]=he(i))):"none"!==n&&(r[o]="none",J.set(i,"display",n)));for(o=0;o<s;o++)null!=r[o]&&(e[o].style.display=r[o]);return e}T.fn.extend({show:function(){return pe(this,!0)},hide:function(){return pe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){ce(this)?T(this).show():T(this).hide()}))}});var ge=/^(?:checkbox|radio)$/i,me=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,ve=/^$|^module$|\/(?:java|ecma)script/i,ye={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function be(e,t){var n;return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&I(e,t)?T.merge([e],n):n}function _e(e,t){for(var n=0,i=e.length;n<i;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}ye.optgroup=ye.option,ye.tbody=ye.tfoot=ye.colgroup=ye.caption=ye.thead,ye.th=ye.td;var we,Ee,Te=/<|&#?\w+;/;function Ce(e,t,n,i,r){for(var o,s,a,l,c,u,f=t.createDocumentFragment(),d=[],h=0,p=e.length;h<p;h++)if((o=e[h])||0===o)if("object"===E(o))T.merge(d,o.nodeType?[o]:o);else if(Te.test(o)){for(s=s||f.appendChild(t.createElement("div")),a=(me.exec(o)||["",""])[1].toLowerCase(),l=ye[a]||ye._default,s.innerHTML=l[1]+T.htmlPrefilter(o)+l[2],u=l[0];u--;)s=s.lastChild;T.merge(d,s.childNodes),(s=f.firstChild).textContent=""}else d.push(t.createTextNode(o));for(f.textContent="",h=0;o=d[h++];)if(i&&T.inArray(o,i)>-1)r&&r.push(o);else if(c=ae(o),s=be(f.appendChild(o),"script"),c&&_e(s),n)for(u=0;o=s[u++];)ve.test(o.type||"")&&n.push(o);return f}we=s.createDocumentFragment().appendChild(s.createElement("div")),(Ee=s.createElement("input")).setAttribute("type","radio"),Ee.setAttribute("checked","checked"),Ee.setAttribute("name","t"),we.appendChild(Ee),v.checkClone=we.cloneNode(!0).cloneNode(!0).lastChild.checked,we.innerHTML="<textarea>x</textarea>",v.noCloneChecked=!!we.cloneNode(!0).lastChild.defaultValue;var xe=/^key/,Se=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,De=/^([^.]*)(?:\.(.+)|)/;function Ae(){return!0}function Ne(){return!1}function Ie(e,t){return e===function(){try{return s.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,i,r,o){var s,a;if("object"==typeof t){for(a in"string"!=typeof n&&(i=i||n,n=void 0),t)ke(e,a,n,i,t[a],o);return e}if(null==i&&null==r?(r=n,i=n=void 0):null==r&&("string"==typeof n?(r=i,i=void 0):(r=i,i=n,n=void 0)),!1===r)r=Ne;else if(!r)return e;return 1===o&&(s=r,(r=function(e){return T().off(e),s.apply(this,arguments)}).guid=s.guid||(s.guid=T.guid++)),e.each((function(){T.event.add(this,t,r,i,n)}))}function Oe(e,t,n){n?(J.set(e,t,!1),T.event.add(e,t,{namespace:!1,handler:function(e){var i,r,o=J.get(this,t);if(1&e.isTrigger&&this[t]){if(o.length)(T.event.special[t]||{}).delegateType&&e.stopPropagation();else if(o=l.call(arguments),J.set(this,t,o),i=n(this,t),this[t](),o!==(r=J.get(this,t))||i?J.set(this,t,!1):r={},o!==r)return e.stopImmediatePropagation(),e.preventDefault(),r.value}else o.length&&(J.set(this,t,{value:T.event.trigger(T.extend(o[0],T.Event.prototype),o.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===J.get(e,t)&&T.event.add(e,t,Ae)}T.event={global:{},add:function(e,t,n,i,r){var o,s,a,l,c,u,f,d,h,p,g,m=J.get(e);if(m)for(n.handler&&(n=(o=n).handler,r=o.selector),r&&T.find.matchesSelector(se,r),n.guid||(n.guid=T.guid++),(l=m.events)||(l=m.events={}),(s=m.handle)||(s=m.handle=function(t){return void 0!==T&&T.event.triggered!==t.type?T.event.dispatch.apply(e,arguments):void 0}),c=(t=(t||"").match(M)||[""]).length;c--;)h=g=(a=De.exec(t[c])||[])[1],p=(a[2]||"").split(".").sort(),h&&(f=T.event.special[h]||{},h=(r?f.delegateType:f.bindType)||h,f=T.event.special[h]||{},u=T.extend({type:h,origType:g,data:i,handler:n,guid:n.guid,selector:r,needsContext:r&&T.expr.match.needsContext.test(r),namespace:p.join(".")},o),(d=l[h])||((d=l[h]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,i,p,s)||e.addEventListener&&e.addEventListener(h,s)),f.add&&(f.add.call(e,u),u.handler.guid||(u.handler.guid=n.guid)),r?d.splice(d.delegateCount++,0,u):d.push(u),T.event.global[h]=!0)},remove:function(e,t,n,i,r){var o,s,a,l,c,u,f,d,h,p,g,m=J.hasData(e)&&J.get(e);if(m&&(l=m.events)){for(c=(t=(t||"").match(M)||[""]).length;c--;)if(h=g=(a=De.exec(t[c])||[])[1],p=(a[2]||"").split(".").sort(),h){for(f=T.event.special[h]||{},d=l[h=(i?f.delegateType:f.bindType)||h]||[],a=a[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=d.length;o--;)u=d[o],!r&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||i&&i!==u.selector&&("**"!==i||!u.selector)||(d.splice(o,1),u.selector&&d.delegateCount--,f.remove&&f.remove.call(e,u));s&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,p,m.handle)||T.removeEvent(e,h,m.handle),delete l[h])}else for(h in l)T.event.remove(e,h+t[c],n,i,!0);T.isEmptyObject(l)&&J.remove(e,"handle events")}},dispatch:function(e){var t,n,i,r,o,s,a=T.event.fix(e),l=new Array(arguments.length),c=(J.get(this,"events")||{})[a.type]||[],u=T.event.special[a.type]||{};for(l[0]=a,t=1;t<arguments.length;t++)l[t]=arguments[t];if(a.delegateTarget=this,!u.preDispatch||!1!==u.preDispatch.call(this,a)){for(s=T.event.handlers.call(this,a,c),t=0;(r=s[t++])&&!a.isPropagationStopped();)for(a.currentTarget=r.elem,n=0;(o=r.handlers[n++])&&!a.isImmediatePropagationStopped();)a.rnamespace&&!1!==o.namespace&&!a.rnamespace.test(o.namespace)||(a.handleObj=o,a.data=o.data,void 0!==(i=((T.event.special[o.origType]||{}).handle||o.handler).apply(r.elem,l))&&!1===(a.result=i)&&(a.preventDefault(),a.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,a),a.result}},handlers:function(e,t){var n,i,r,o,s,a=[],l=t.delegateCount,c=e.target;if(l&&c.nodeType&&!("click"===e.type&&e.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==e.type||!0!==c.disabled)){for(o=[],s={},n=0;n<l;n++)void 0===s[r=(i=t[n]).selector+" "]&&(s[r]=i.needsContext?T(r,this).index(c)>-1:T.find(r,this,null,[c]).length),s[r]&&o.push(i);o.length&&a.push({elem:c,handlers:o})}return c=this,l<t.length&&a.push({elem:c,handlers:t.slice(l)}),a},addProp:function(e,t){Object.defineProperty(T.Event.prototype,e,{enumerable:!0,configurable:!0,get:y(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[T.expando]?e:new T.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return ge.test(t.type)&&t.click&&I(t,"input")&&Oe(t,"click",Ae),!1},trigger:function(e){var t=this||e;return ge.test(t.type)&&t.click&&I(t,"input")&&Oe(t,"click"),!0},_default:function(e){var t=e.target;return ge.test(t.type)&&t.click&&I(t,"input")&&J.get(t,"click")||I(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},T.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},T.Event=function(e,t){if(!(this instanceof T.Event))return new T.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ae:Ne,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&T.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[T.expando]=!0},T.Event.prototype={constructor:T.Event,isDefaultPrevented:Ne,isPropagationStopped:Ne,isImmediatePropagationStopped:Ne,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ae,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ae,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ae,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},T.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&xe.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Se.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},T.event.addProp),T.each({focus:"focusin",blur:"focusout"},(function(e,t){T.event.special[e]={setup:function(){return Oe(this,e,Ie),!1},trigger:function(){return Oe(this,e),!0},delegateType:t}})),T.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){T.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,r=e.relatedTarget,o=e.handleObj;return r&&(r===i||T.contains(i,r))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}})),T.fn.extend({on:function(e,t,n,i){return ke(this,e,t,n,i)},one:function(e,t,n,i){return ke(this,e,t,n,i,1)},off:function(e,t,n){var i,r;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,T(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(r in e)this.off(r,t,e[r]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ne),this.each((function(){T.event.remove(this,e,n,t)}))}});var Le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,je=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Re(e,t){return I(e,"table")&&I(11!==t.nodeType?t:t.firstChild,"tr")&&T(e).children("tbody")[0]||e}function Me(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function qe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function We(e,t){var n,i,r,o,s,a,l,c;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),s=J.set(t,o),c=o.events))for(r in delete s.handle,s.events={},c)for(n=0,i=c[r].length;n<i;n++)T.event.add(t,r,c[r][n]);Z.hasData(e)&&(a=Z.access(e),l=T.extend({},a),Z.set(t,l))}}function Fe(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ge.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Be(e,t,n,i){t=c.apply([],t);var r,o,s,a,l,u,f=0,d=e.length,h=d-1,p=t[0],g=y(p);if(g||d>1&&"string"==typeof p&&!v.checkClone&&Pe.test(p))return e.each((function(r){var o=e.eq(r);g&&(t[0]=p.call(this,r,o.html())),Be(o,t,n,i)}));if(d&&(o=(r=Ce(t,e[0].ownerDocument,!1,e,i)).firstChild,1===r.childNodes.length&&(r=o),o||i)){for(a=(s=T.map(be(r,"script"),Me)).length;f<d;f++)l=r,f!==h&&(l=T.clone(l,!0,!0),a&&T.merge(s,be(l,"script"))),n.call(e[f],l,f);if(a)for(u=s[s.length-1].ownerDocument,T.map(s,qe),f=0;f<a;f++)l=s[f],ve.test(l.type||"")&&!J.access(l,"globalEval")&&T.contains(u,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?T._evalUrl&&!l.noModule&&T._evalUrl(l.src,{nonce:l.nonce||l.getAttribute("nonce")}):w(l.textContent.replace(He,""),l,u))}return e}function Ue(e,t,n){for(var i,r=t?T.filter(t,e):e,o=0;null!=(i=r[o]);o++)n||1!==i.nodeType||T.cleanData(be(i)),i.parentNode&&(n&&ae(i)&&_e(be(i,"script")),i.parentNode.removeChild(i));return e}T.extend({htmlPrefilter:function(e){return e.replace(Le,"<$1></$2>")},clone:function(e,t,n){var i,r,o,s,a=e.cloneNode(!0),l=ae(e);if(!(v.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||T.isXMLDoc(e)))for(s=be(a),i=0,r=(o=be(e)).length;i<r;i++)Fe(o[i],s[i]);if(t)if(n)for(o=o||be(e),s=s||be(a),i=0,r=o.length;i<r;i++)We(o[i],s[i]);else We(e,a);return(s=be(a,"script")).length>0&&_e(s,!l&&be(e,"script")),a},cleanData:function(e){for(var t,n,i,r=T.event.special,o=0;void 0!==(n=e[o]);o++)if(X(n)){if(t=n[J.expando]){if(t.events)for(i in t.events)r[i]?T.event.remove(n,i):T.removeEvent(n,i,t.handle);n[J.expando]=void 0}n[Z.expando]&&(n[Z.expando]=void 0)}}}),T.fn.extend({detach:function(e){return Ue(this,e,!0)},remove:function(e){return Ue(this,e)},text:function(e){return K(this,(function(e){return void 0===e?T.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return Be(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Re(this,e).appendChild(e)}))},prepend:function(){return Be(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Re(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return Be(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return Be(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(T.cleanData(be(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return T.clone(this,e,t)}))},html:function(e){return K(this,(function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!je.test(e)&&!ye[(me.exec(e)||["",""])[1].toLowerCase()]){e=T.htmlPrefilter(e);try{for(;n<i;n++)1===(t=this[n]||{}).nodeType&&(T.cleanData(be(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[];return Be(this,arguments,(function(t){var n=this.parentNode;T.inArray(this,e)<0&&(T.cleanData(be(this)),n&&n.replaceChild(t,this))}),e)}}),T.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){T.fn[e]=function(e){for(var n,i=[],r=T(e),o=r.length-1,s=0;s<=o;s++)n=s===o?this:this.clone(!0),T(r[s])[t](n),u.apply(i,n.get());return this.pushStack(i)}}));var Ve=new RegExp("^("+ie+")(?!px)[a-z%]+$","i"),Ke=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=n),t.getComputedStyle(e)},$e=new RegExp(oe.join("|"),"i");function Qe(e,t,n){var i,r,o,s,a=e.style;return(n=n||Ke(e))&&(""!==(s=n.getPropertyValue(t)||n[t])||ae(e)||(s=T.style(e,t)),!v.pixelBoxStyles()&&Ve.test(s)&&$e.test(t)&&(i=a.width,r=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=r,a.maxWidth=o)),void 0!==s?s+"":s}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){c.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",se.appendChild(c).appendChild(u);var e=n.getComputedStyle(u);i="1%"!==e.top,l=12===t(e.marginLeft),u.style.right="60%",a=36===t(e.right),r=36===t(e.width),u.style.position="absolute",o=12===t(u.offsetWidth/3),se.removeChild(c),u=null}}function t(e){return Math.round(parseFloat(e))}var i,r,o,a,l,c=s.createElement("div"),u=s.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",v.clearCloneStyle="content-box"===u.style.backgroundClip,T.extend(v,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),a},pixelPosition:function(){return e(),i},reliableMarginLeft:function(){return e(),l},scrollboxSize:function(){return e(),o}}))}();var Ye=["Webkit","Moz","ms"],Xe=s.createElement("div").style,Ge={};function Je(e){var t=T.cssProps[e]||Ge[e];return t||(e in Xe?e:Ge[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=Ye.length;n--;)if((e=Ye[n]+t)in Xe)return e}(e)||e)}var Ze=/^(none|table(?!-c[ea]).+)/,et=/^--/,tt={position:"absolute",visibility:"hidden",display:"block"},nt={letterSpacing:"0",fontWeight:"400"};function it(e,t,n){var i=re.exec(t);return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):t}function rt(e,t,n,i,r,o){var s="width"===t?1:0,a=0,l=0;if(n===(i?"border":"content"))return 0;for(;s<4;s+=2)"margin"===n&&(l+=T.css(e,n+oe[s],!0,r)),i?("content"===n&&(l-=T.css(e,"padding"+oe[s],!0,r)),"margin"!==n&&(l-=T.css(e,"border"+oe[s]+"Width",!0,r))):(l+=T.css(e,"padding"+oe[s],!0,r),"padding"!==n?l+=T.css(e,"border"+oe[s]+"Width",!0,r):a+=T.css(e,"border"+oe[s]+"Width",!0,r));return!i&&o>=0&&(l+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-l-a-.5))||0),l}function ot(e,t,n){var i=Ke(e),r=(!v.boxSizingReliable()||n)&&"border-box"===T.css(e,"boxSizing",!1,i),o=r,s=Qe(e,t,i),a="offset"+t[0].toUpperCase()+t.slice(1);if(Ve.test(s)){if(!n)return s;s="auto"}return(!v.boxSizingReliable()&&r||"auto"===s||!parseFloat(s)&&"inline"===T.css(e,"display",!1,i))&&e.getClientRects().length&&(r="border-box"===T.css(e,"boxSizing",!1,i),(o=a in e)&&(s=e[a])),(s=parseFloat(s)||0)+rt(e,t,n||(r?"border":"content"),o,i,s)+"px"}function st(e,t,n,i,r){return new st.prototype.init(e,t,n,i,r)}T.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Qe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var r,o,s,a=Y(t),l=et.test(t),c=e.style;if(l||(t=Je(a)),s=T.cssHooks[t]||T.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(r=s.get(e,!1,i))?r:c[t];"string"===(o=typeof n)&&(r=re.exec(n))&&r[1]&&(n=fe(e,t,r),o="number"),null!=n&&n==n&&("number"!==o||l||(n+=r&&r[3]||(T.cssNumber[a]?"":"px")),v.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,i))||(l?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,i){var r,o,s,a=Y(t);return et.test(t)||(t=Je(a)),(s=T.cssHooks[t]||T.cssHooks[a])&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=Qe(e,t,i)),"normal"===r&&t in nt&&(r=nt[t]),""===n||n?(o=parseFloat(r),!0===n||isFinite(o)?o||0:r):r}}),T.each(["height","width"],(function(e,t){T.cssHooks[t]={get:function(e,n,i){if(n)return!Ze.test(T.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ot(e,t,i):ue(e,tt,(function(){return ot(e,t,i)}))},set:function(e,n,i){var r,o=Ke(e),s=!v.scrollboxSize()&&"absolute"===o.position,a=(s||i)&&"border-box"===T.css(e,"boxSizing",!1,o),l=i?rt(e,t,i,a,o):0;return a&&s&&(l-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-rt(e,t,"border",!1,o)-.5)),l&&(r=re.exec(n))&&"px"!==(r[3]||"px")&&(e.style[t]=n,n=T.css(e,t)),it(0,n,l)}}})),T.cssHooks.marginLeft=ze(v.reliableMarginLeft,(function(e,t){if(t)return(parseFloat(Qe(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),T.each({margin:"",padding:"",border:"Width"},(function(e,t){T.cssHooks[e+t]={expand:function(n){for(var i=0,r={},o="string"==typeof n?n.split(" "):[n];i<4;i++)r[e+oe[i]+t]=o[i]||o[i-2]||o[0];return r}},"margin"!==e&&(T.cssHooks[e+t].set=it)})),T.fn.extend({css:function(e,t){return K(this,(function(e,t,n){var i,r,o={},s=0;if(Array.isArray(t)){for(i=Ke(e),r=t.length;s<r;s++)o[t[s]]=T.css(e,t[s],!1,i);return o}return void 0!==n?T.style(e,t,n):T.css(e,t)}),e,t,arguments.length>1)}}),T.Tween=st,st.prototype={constructor:st,init:function(e,t,n,i,r,o){this.elem=e,this.prop=n,this.easing=r||T.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=o||(T.cssNumber[n]?"":"px")},cur:function(){var e=st.propHooks[this.prop];return e&&e.get?e.get(this):st.propHooks._default.get(this)},run:function(e){var t,n=st.propHooks[this.prop];return this.options.duration?this.pos=t=T.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):st.propHooks._default.set(this),this}},st.prototype.init.prototype=st.prototype,st.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=T.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){T.fx.step[e.prop]?T.fx.step[e.prop](e):1!==e.elem.nodeType||!T.cssHooks[e.prop]&&null==e.elem.style[Je(e.prop)]?e.elem[e.prop]=e.now:T.style(e.elem,e.prop,e.now+e.unit)}}},st.propHooks.scrollTop=st.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},T.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},T.fx=st.prototype.init,T.fx.step={};var at,lt,ct=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function ft(){lt&&(!1===s.hidden&&n.requestAnimationFrame?n.requestAnimationFrame(ft):n.setTimeout(ft,T.fx.interval),T.fx.tick())}function dt(){return n.setTimeout((function(){at=void 0})),at=Date.now()}function ht(e,t){var n,i=0,r={height:e};for(t=t?1:0;i<4;i+=2-t)r["margin"+(n=oe[i])]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function pt(e,t,n){for(var i,r=(gt.tweeners[t]||[]).concat(gt.tweeners["*"]),o=0,s=r.length;o<s;o++)if(i=r[o].call(n,t,e))return i}function gt(e,t,n){var i,r,o=0,s=gt.prefilters.length,a=T.Deferred().always((function(){delete l.elem})),l=function(){if(r)return!1;for(var t=at||dt(),n=Math.max(0,c.startTime+c.duration-t),i=1-(n/c.duration||0),o=0,s=c.tweens.length;o<s;o++)c.tweens[o].run(i);return a.notifyWith(e,[c,i,n]),i<1&&s?n:(s||a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:T.extend({},t),opts:T.extend(!0,{specialEasing:{},easing:T.easing._default},n),originalProperties:t,originalOptions:n,startTime:at||dt(),duration:n.duration,tweens:[],createTween:function(t,n){var i=T.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(i),i},stop:function(t){var n=0,i=t?c.tweens.length:0;if(r)return this;for(r=!0;n<i;n++)c.tweens[n].run(1);return t?(a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c,t])):a.rejectWith(e,[c,t]),this}}),u=c.props;for(!function(e,t){var n,i,r,o,s;for(n in e)if(r=t[i=Y(n)],o=e[n],Array.isArray(o)&&(r=o[1],o=e[n]=o[0]),n!==i&&(e[i]=o,delete e[n]),(s=T.cssHooks[i])&&"expand"in s)for(n in o=s.expand(o),delete e[i],o)n in e||(e[n]=o[n],t[n]=r);else t[i]=r}(u,c.opts.specialEasing);o<s;o++)if(i=gt.prefilters[o].call(c,e,u,c.opts))return y(i.stop)&&(T._queueHooks(c.elem,c.opts.queue).stop=i.stop.bind(i)),i;return T.map(u,pt,c),y(c.opts.start)&&c.opts.start.call(e,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),T.fx.timer(T.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c}T.Animation=T.extend(gt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return fe(n.elem,e,re.exec(t),n),n}]},tweener:function(e,t){y(e)?(t=e,e=["*"]):e=e.match(M);for(var n,i=0,r=e.length;i<r;i++)n=e[i],gt.tweeners[n]=gt.tweeners[n]||[],gt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var i,r,o,s,a,l,c,u,f="width"in t||"height"in t,d=this,h={},p=e.style,g=e.nodeType&&ce(e),m=J.get(e,"fxshow");for(i in n.queue||(null==(s=T._queueHooks(e,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,d.always((function(){d.always((function(){s.unqueued--,T.queue(e,"fx").length||s.empty.fire()}))}))),t)if(r=t[i],ct.test(r)){if(delete t[i],o=o||"toggle"===r,r===(g?"hide":"show")){if("show"!==r||!m||void 0===m[i])continue;g=!0}h[i]=m&&m[i]||T.style(e,i)}if((l=!T.isEmptyObject(t))||!T.isEmptyObject(h))for(i in f&&1===e.nodeType&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],null==(c=m&&m.display)&&(c=J.get(e,"display")),"none"===(u=T.css(e,"display"))&&(c?u=c:(pe([e],!0),c=e.style.display||c,u=T.css(e,"display"),pe([e]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===T.css(e,"float")&&(l||(d.done((function(){p.display=c})),null==c&&(u=p.display,c="none"===u?"":u)),p.display="inline-block")),n.overflow&&(p.overflow="hidden",d.always((function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}))),l=!1,h)l||(m?"hidden"in m&&(g=m.hidden):m=J.access(e,"fxshow",{display:c}),o&&(m.hidden=!g),g&&pe([e],!0),d.done((function(){for(i in g||pe([e]),J.remove(e,"fxshow"),h)T.style(e,i,h[i])}))),l=pt(g?m[i]:0,i,d),i in m||(m[i]=l.start,g&&(l.end=l.start,l.start=0))}],prefilter:function(e,t){t?gt.prefilters.unshift(e):gt.prefilters.push(e)}}),T.speed=function(e,t,n){var i=e&&"object"==typeof e?T.extend({},e):{complete:n||!n&&t||y(e)&&e,duration:e,easing:n&&t||t&&!y(t)&&t};return T.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in T.fx.speeds?i.duration=T.fx.speeds[i.duration]:i.duration=T.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){y(i.old)&&i.old.call(this),i.queue&&T.dequeue(this,i.queue)},i},T.fn.extend({fadeTo:function(e,t,n,i){return this.filter(ce).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var r=T.isEmptyObject(e),o=T.speed(t,n,i),s=function(){var t=gt(this,T.extend({},e),o);(r||J.get(this,"finish"))&&t.stop(!0)};return s.finish=s,r||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each((function(){var t=!0,r=null!=e&&e+"queueHooks",o=T.timers,s=J.get(this);if(r)s[r]&&s[r].stop&&i(s[r]);else for(r in s)s[r]&&s[r].stop&&ut.test(r)&&i(s[r]);for(r=o.length;r--;)o[r].elem!==this||null!=e&&o[r].queue!==e||(o[r].anim.stop(n),t=!1,o.splice(r,1));!t&&n||T.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=J.get(this),i=n[e+"queue"],r=n[e+"queueHooks"],o=T.timers,s=i?i.length:0;for(n.finish=!0,T.queue(this,e,[]),r&&r.stop&&r.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<s;t++)i[t]&&i[t].finish&&i[t].finish.call(this);delete n.finish}))}}),T.each(["toggle","show","hide"],(function(e,t){var n=T.fn[t];T.fn[t]=function(e,i,r){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ht(t,!0),e,i,r)}})),T.each({slideDown:ht("show"),slideUp:ht("hide"),slideToggle:ht("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){T.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}})),T.timers=[],T.fx.tick=function(){var e,t=0,n=T.timers;for(at=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||T.fx.stop(),at=void 0},T.fx.timer=function(e){T.timers.push(e),T.fx.start()},T.fx.interval=13,T.fx.start=function(){lt||(lt=!0,ft())},T.fx.stop=function(){lt=null},T.fx.speeds={slow:600,fast:200,_default:400},T.fn.delay=function(e,t){return e=T.fx&&T.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,i){var r=n.setTimeout(t,e);i.stop=function(){n.clearTimeout(r)}}))},function(){var e=s.createElement("input"),t=s.createElement("select").appendChild(s.createElement("option"));e.type="checkbox",v.checkOn=""!==e.value,v.optSelected=t.selected,(e=s.createElement("input")).value="t",e.type="radio",v.radioValue="t"===e.value}();var mt,vt=T.expr.attrHandle;T.fn.extend({attr:function(e,t){return K(this,T.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){T.removeAttr(this,e)}))}}),T.extend({attr:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?T.prop(e,t,n):(1===o&&T.isXMLDoc(e)||(r=T.attrHooks[t.toLowerCase()]||(T.expr.match.bool.test(t)?mt:void 0)),void 0!==n?null===n?void T.removeAttr(e,t):r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):r&&"get"in r&&null!==(i=r.get(e,t))?i:null==(i=T.find.attr(e,t))?void 0:i)},attrHooks:{type:{set:function(e,t){if(!v.radioValue&&"radio"===t&&I(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i=0,r=t&&t.match(M);if(r&&1===e.nodeType)for(;n=r[i++];)e.removeAttribute(n)}}),mt={set:function(e,t,n){return!1===t?T.removeAttr(e,n):e.setAttribute(n,n),n}},T.each(T.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=vt[t]||T.find.attr;vt[t]=function(e,t,i){var r,o,s=t.toLowerCase();return i||(o=vt[s],vt[s]=r,r=null!=n(e,t,i)?s:null,vt[s]=o),r}}));var yt=/^(?:input|select|textarea|button)$/i,bt=/^(?:a|area)$/i;function _t(e){return(e.match(M)||[]).join(" ")}function wt(e){return e.getAttribute&&e.getAttribute("class")||""}function Et(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(M)||[]}T.fn.extend({prop:function(e,t){return K(this,T.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[T.propFix[e]||e]}))}}),T.extend({prop:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&T.isXMLDoc(e)||(t=T.propFix[t]||t,r=T.propHooks[t]),void 0!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:e[t]=n:r&&"get"in r&&null!==(i=r.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){var t=T.find.attr(e,"tabindex");return t?parseInt(t,10):yt.test(e.nodeName)||bt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),v.optSelected||(T.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),T.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){T.propFix[this.toLowerCase()]=this})),T.fn.extend({addClass:function(e){var t,n,i,r,o,s,a,l=0;if(y(e))return this.each((function(t){T(this).addClass(e.call(this,t,wt(this)))}));if((t=Et(e)).length)for(;n=this[l++];)if(r=wt(n),i=1===n.nodeType&&" "+_t(r)+" "){for(s=0;o=t[s++];)i.indexOf(" "+o+" ")<0&&(i+=o+" ");r!==(a=_t(i))&&n.setAttribute("class",a)}return this},removeClass:function(e){var t,n,i,r,o,s,a,l=0;if(y(e))return this.each((function(t){T(this).removeClass(e.call(this,t,wt(this)))}));if(!arguments.length)return this.attr("class","");if((t=Et(e)).length)for(;n=this[l++];)if(r=wt(n),i=1===n.nodeType&&" "+_t(r)+" "){for(s=0;o=t[s++];)for(;i.indexOf(" "+o+" ")>-1;)i=i.replace(" "+o+" "," ");r!==(a=_t(i))&&n.setAttribute("class",a)}return this},toggleClass:function(e,t){var n=typeof e,i="string"===n||Array.isArray(e);return"boolean"==typeof t&&i?t?this.addClass(e):this.removeClass(e):y(e)?this.each((function(n){T(this).toggleClass(e.call(this,n,wt(this),t),t)})):this.each((function(){var t,r,o,s;if(i)for(r=0,o=T(this),s=Et(e);t=s[r++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);else void 0!==e&&"boolean"!==n||((t=wt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,i=0;for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+_t(wt(n))+" ").indexOf(t)>-1)return!0;return!1}});var Tt=/\r/g;T.fn.extend({val:function(e){var t,n,i,r=this[0];return arguments.length?(i=y(e),this.each((function(n){var r;1===this.nodeType&&(null==(r=i?e.call(this,n,T(this).val()):e)?r="":"number"==typeof r?r+="":Array.isArray(r)&&(r=T.map(r,(function(e){return null==e?"":e+""}))),(t=T.valHooks[this.type]||T.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,r,"value")||(this.value=r))}))):r?(t=T.valHooks[r.type]||T.valHooks[r.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(r,"value"))?n:"string"==typeof(n=r.value)?n.replace(Tt,""):null==n?"":n:void 0}}),T.extend({valHooks:{option:{get:function(e){var t=T.find.attr(e,"value");return null!=t?t:_t(T.text(e))}},select:{get:function(e){var t,n,i,r=e.options,o=e.selectedIndex,s="select-one"===e.type,a=s?null:[],l=s?o+1:r.length;for(i=o<0?l:s?o:0;i<l;i++)if(((n=r[i]).selected||i===o)&&!n.disabled&&(!n.parentNode.disabled||!I(n.parentNode,"optgroup"))){if(t=T(n).val(),s)return t;a.push(t)}return a},set:function(e,t){for(var n,i,r=e.options,o=T.makeArray(t),s=r.length;s--;)((i=r[s]).selected=T.inArray(T.valHooks.option.get(i),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),T.each(["radio","checkbox"],(function(){T.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=T.inArray(T(e).val(),t)>-1}},v.checkOn||(T.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),v.focusin="onfocusin"in n;var Ct=/^(?:focusinfocus|focusoutblur)$/,xt=function(e){e.stopPropagation()};T.extend(T.event,{trigger:function(e,t,i,r){var o,a,l,c,u,f,d,h,g=[i||s],m=p.call(e,"type")?e.type:e,v=p.call(e,"namespace")?e.namespace.split("."):[];if(a=h=l=i=i||s,3!==i.nodeType&&8!==i.nodeType&&!Ct.test(m+T.event.triggered)&&(m.indexOf(".")>-1&&(v=m.split("."),m=v.shift(),v.sort()),u=m.indexOf(":")<0&&"on"+m,(e=e[T.expando]?e:new T.Event(m,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=v.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=i),t=null==t?[e]:T.makeArray(t,[e]),d=T.event.special[m]||{},r||!d.trigger||!1!==d.trigger.apply(i,t))){if(!r&&!d.noBubble&&!b(i)){for(c=d.delegateType||m,Ct.test(c+m)||(a=a.parentNode);a;a=a.parentNode)g.push(a),l=a;l===(i.ownerDocument||s)&&g.push(l.defaultView||l.parentWindow||n)}for(o=0;(a=g[o++])&&!e.isPropagationStopped();)h=a,e.type=o>1?c:d.bindType||m,(f=(J.get(a,"events")||{})[e.type]&&J.get(a,"handle"))&&f.apply(a,t),(f=u&&a[u])&&f.apply&&X(a)&&(e.result=f.apply(a,t),!1===e.result&&e.preventDefault());return e.type=m,r||e.isDefaultPrevented()||d._default&&!1!==d._default.apply(g.pop(),t)||!X(i)||u&&y(i[m])&&!b(i)&&((l=i[u])&&(i[u]=null),T.event.triggered=m,e.isPropagationStopped()&&h.addEventListener(m,xt),i[m](),e.isPropagationStopped()&&h.removeEventListener(m,xt),T.event.triggered=void 0,l&&(i[u]=l)),e.result}},simulate:function(e,t,n){var i=T.extend(new T.Event,n,{type:e,isSimulated:!0});T.event.trigger(i,null,t)}}),T.fn.extend({trigger:function(e,t){return this.each((function(){T.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0];if(n)return T.event.trigger(e,t,n,!0)}}),v.focusin||T.each({focus:"focusin",blur:"focusout"},(function(e,t){var n=function(e){T.event.simulate(t,e.target,T.event.fix(e))};T.event.special[t]={setup:function(){var i=this.ownerDocument||this,r=J.access(i,t);r||i.addEventListener(e,n,!0),J.access(i,t,(r||0)+1)},teardown:function(){var i=this.ownerDocument||this,r=J.access(i,t)-1;r?J.access(i,t,r):(i.removeEventListener(e,n,!0),J.remove(i,t))}}}));var St=n.location,Dt=Date.now(),At=/\?/;T.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new n.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||T.error("Invalid XML: "+e),t};var Nt=/\[\]$/,It=/\r?\n/g,kt=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;function Lt(e,t,n,i){var r;if(Array.isArray(t))T.each(t,(function(t,r){n||Nt.test(e)?i(e,r):Lt(e+"["+("object"==typeof r&&null!=r?t:"")+"]",r,n,i)}));else if(n||"object"!==E(t))i(e,t);else for(r in t)Lt(e+"["+r+"]",t[r],n,i)}T.param=function(e,t){var n,i=[],r=function(e,t){var n=y(t)?t():t;i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!T.isPlainObject(e))T.each(e,(function(){r(this.name,this.value)}));else for(n in e)Lt(n,e[n],t,r);return i.join("&")},T.fn.extend({serialize:function(){return T.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=T.prop(this,"elements");return e?T.makeArray(e):this})).filter((function(){var e=this.type;return this.name&&!T(this).is(":disabled")&&Ot.test(this.nodeName)&&!kt.test(e)&&(this.checked||!ge.test(e))})).map((function(e,t){var n=T(this).val();return null==n?null:Array.isArray(n)?T.map(n,(function(e){return{name:t.name,value:e.replace(It,"\r\n")}})):{name:t.name,value:n.replace(It,"\r\n")}})).get()}});var jt=/%20/g,Pt=/#.*$/,Ht=/([?&])_=[^&]*/,Rt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Mt=/^(?:GET|HEAD)$/,qt=/^\/\//,Wt={},Ft={},Bt="*/".concat("*"),Ut=s.createElement("a");function Vt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var i,r=0,o=t.toLowerCase().match(M)||[];if(y(n))for(;i=o[r++];)"+"===i[0]?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function Kt(e,t,n,i){var r={},o=e===Ft;function s(a){var l;return r[a]=!0,T.each(e[a]||[],(function(e,a){var c=a(t,n,i);return"string"!=typeof c||o||r[c]?o?!(l=c):void 0:(t.dataTypes.unshift(c),s(c),!1)})),l}return s(t.dataTypes[0])||!r["*"]&&s("*")}function $t(e,t){var n,i,r=T.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((r[n]?e:i||(i={}))[n]=t[n]);return i&&T.extend(!0,e,i),e}Ut.href=St.href,T.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:St.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(St.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Bt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":T.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?$t($t(e,T.ajaxSettings),t):$t(T.ajaxSettings,e)},ajaxPrefilter:Vt(Wt),ajaxTransport:Vt(Ft),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var i,r,o,a,l,c,u,f,d,h,p=T.ajaxSetup({},t),g=p.context||p,m=p.context&&(g.nodeType||g.jquery)?T(g):T.event,v=T.Deferred(),y=T.Callbacks("once memory"),b=p.statusCode||{},_={},w={},E="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(u){if(!a)for(a={};t=Rt.exec(o);)a[t[1].toLowerCase()+" "]=(a[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=a[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return u?o:null},setRequestHeader:function(e,t){return null==u&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,_[e]=t),this},overrideMimeType:function(e){return null==u&&(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(u)C.always(e[C.status]);else for(t in e)b[t]=[b[t],e[t]];return this},abort:function(e){var t=e||E;return i&&i.abort(t),x(0,t),this}};if(v.promise(C),p.url=((e||p.url||St.href)+"").replace(qt,St.protocol+"//"),p.type=t.method||t.type||p.method||p.type,p.dataTypes=(p.dataType||"*").toLowerCase().match(M)||[""],null==p.crossDomain){c=s.createElement("a");try{c.href=p.url,c.href=c.href,p.crossDomain=Ut.protocol+"//"+Ut.host!=c.protocol+"//"+c.host}catch(e){p.crossDomain=!0}}if(p.data&&p.processData&&"string"!=typeof p.data&&(p.data=T.param(p.data,p.traditional)),Kt(Wt,p,t,C),u)return C;for(d in(f=T.event&&p.global)&&0==T.active++&&T.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Mt.test(p.type),r=p.url.replace(Pt,""),p.hasContent?p.data&&p.processData&&0===(p.contentType||"").indexOf("application/x-www-form-urlencoded")&&(p.data=p.data.replace(jt,"+")):(h=p.url.slice(r.length),p.data&&(p.processData||"string"==typeof p.data)&&(r+=(At.test(r)?"&":"?")+p.data,delete p.data),!1===p.cache&&(r=r.replace(Ht,"$1"),h=(At.test(r)?"&":"?")+"_="+Dt+++h),p.url=r+h),p.ifModified&&(T.lastModified[r]&&C.setRequestHeader("If-Modified-Since",T.lastModified[r]),T.etag[r]&&C.setRequestHeader("If-None-Match",T.etag[r])),(p.data&&p.hasContent&&!1!==p.contentType||t.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Bt+"; q=0.01":""):p.accepts["*"]),p.headers)C.setRequestHeader(d,p.headers[d]);if(p.beforeSend&&(!1===p.beforeSend.call(g,C,p)||u))return C.abort();if(E="abort",y.add(p.complete),C.done(p.success),C.fail(p.error),i=Kt(Ft,p,t,C)){if(C.readyState=1,f&&m.trigger("ajaxSend",[C,p]),u)return C;p.async&&p.timeout>0&&(l=n.setTimeout((function(){C.abort("timeout")}),p.timeout));try{u=!1,i.send(_,x)}catch(e){if(u)throw e;x(-1,e)}}else x(-1,"No Transport");function x(e,t,s,a){var c,d,h,_,w,E=t;u||(u=!0,l&&n.clearTimeout(l),i=void 0,o=a||"",C.readyState=e>0?4:0,c=e>=200&&e<300||304===e,s&&(_=function(e,t,n){for(var i,r,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(r in a)if(a[r]&&a[r].test(i)){l.unshift(r);break}if(l[0]in n)o=l[0];else{for(r in n){if(!l[0]||e.converters[r+" "+l[0]]){o=r;break}s||(s=r)}o=o||s}if(o)return o!==l[0]&&l.unshift(o),n[o]}(p,C,s)),_=function(e,t,n,i){var r,o,s,a,l,c={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(!(s=c[l+" "+o]||c["* "+o]))for(r in c)if((a=r.split(" "))[1]===o&&(s=c[l+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[r]:!0!==c[r]&&(o=a[0],u.unshift(a[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}(p,_,C,c),c?(p.ifModified&&((w=C.getResponseHeader("Last-Modified"))&&(T.lastModified[r]=w),(w=C.getResponseHeader("etag"))&&(T.etag[r]=w)),204===e||"HEAD"===p.type?E="nocontent":304===e?E="notmodified":(E=_.state,d=_.data,c=!(h=_.error))):(h=E,!e&&E||(E="error",e<0&&(e=0))),C.status=e,C.statusText=(t||E)+"",c?v.resolveWith(g,[d,E,C]):v.rejectWith(g,[C,E,h]),C.statusCode(b),b=void 0,f&&m.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?d:h]),y.fireWith(g,[C,E]),f&&(m.trigger("ajaxComplete",[C,p]),--T.active||T.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return T.get(e,t,n,"json")},getScript:function(e,t){return T.get(e,void 0,t,"script")}}),T.each(["get","post"],(function(e,t){T[t]=function(e,n,i,r){return y(n)&&(r=r||i,i=n,n=void 0),T.ajax(T.extend({url:e,type:t,dataType:r,data:n,success:i},T.isPlainObject(e)&&e))}})),T._evalUrl=function(e,t){return T.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){T.globalEval(e,t)}})},T.fn.extend({wrapAll:function(e){var t;return this[0]&&(y(e)&&(e=e.call(this[0])),t=T(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e})).append(this)),this},wrapInner:function(e){return y(e)?this.each((function(t){T(this).wrapInner(e.call(this,t))})):this.each((function(){var t=T(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=y(e);return this.each((function(n){T(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){T(this).replaceWith(this.childNodes)})),this}}),T.expr.pseudos.hidden=function(e){return!T.expr.pseudos.visible(e)},T.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},T.ajaxSettings.xhr=function(){try{return new n.XMLHttpRequest}catch(e){}};var Qt={0:200,1223:204},zt=T.ajaxSettings.xhr();v.cors=!!zt&&"withCredentials"in zt,v.ajax=zt=!!zt,T.ajaxTransport((function(e){var t,i;if(v.cors||zt&&!e.crossDomain)return{send:function(r,o){var s,a=e.xhr();if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s];for(s in e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||r["X-Requested-With"]||(r["X-Requested-With"]="XMLHttpRequest"),r)a.setRequestHeader(s,r[s]);t=function(e){return function(){t&&(t=i=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?o(0,"error"):o(a.status,a.statusText):o(Qt[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=t(),i=a.onerror=a.ontimeout=t("error"),void 0!==a.onabort?a.onabort=i:a.onreadystatechange=function(){4===a.readyState&&n.setTimeout((function(){t&&i()}))},t=t("abort");try{a.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}})),T.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),T.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return T.globalEval(e),e}}}),T.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),T.ajaxTransport("script",(function(e){var t,n;if(e.crossDomain||e.scriptAttrs)return{send:function(i,r){t=T("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&r("error"===e.type?404:200,e.type)}),s.head.appendChild(t[0])},abort:function(){n&&n()}}}));var Yt,Xt=[],Gt=/(=)\?(?=&|$)|\?\?/;T.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||T.expando+"_"+Dt++;return this[e]=!0,e}}),T.ajaxPrefilter("json jsonp",(function(e,t,i){var r,o,s,a=!1!==e.jsonp&&(Gt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=y(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Gt,"$1"+r):!1!==e.jsonp&&(e.url+=(At.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return s||T.error(r+" was not called"),s[0]},e.dataTypes[0]="json",o=n[r],n[r]=function(){s=arguments},i.always((function(){void 0===o?T(n).removeProp(r):n[r]=o,e[r]&&(e.jsonpCallback=t.jsonpCallback,Xt.push(r)),s&&y(o)&&o(s[0]),s=o=void 0})),"script"})),v.createHTMLDocument=((Yt=s.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Yt.childNodes.length),T.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(v.createHTMLDocument?((i=(t=s.implementation.createHTMLDocument("")).createElement("base")).href=s.location.href,t.head.appendChild(i)):t=s),o=!n&&[],(r=k.exec(e))?[t.createElement(r[1])]:(r=Ce([e],t,o),o&&o.length&&T(o).remove(),T.merge([],r.childNodes)));var i,r,o},T.fn.load=function(e,t,n){var i,r,o,s=this,a=e.indexOf(" ");return a>-1&&(i=_t(e.slice(a)),e=e.slice(0,a)),y(t)?(n=t,t=void 0):t&&"object"==typeof t&&(r="POST"),s.length>0&&T.ajax({url:e,type:r||"GET",dataType:"html",data:t}).done((function(e){o=arguments,s.html(i?T("<div>").append(T.parseHTML(e)).find(i):e)})).always(n&&function(e,t){s.each((function(){n.apply(this,o||[e.responseText,t,e])}))}),this},T.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){T.fn[t]=function(e){return this.on(t,e)}})),T.expr.pseudos.animated=function(e){return T.grep(T.timers,(function(t){return e===t.elem})).length},T.offset={setOffset:function(e,t,n){var i,r,o,s,a,l,c=T.css(e,"position"),u=T(e),f={};"static"===c&&(e.style.position="relative"),a=u.offset(),o=T.css(e,"top"),l=T.css(e,"left"),("absolute"===c||"fixed"===c)&&(o+l).indexOf("auto")>-1?(s=(i=u.position()).top,r=i.left):(s=parseFloat(o)||0,r=parseFloat(l)||0),y(t)&&(t=t.call(e,n,T.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+r),"using"in t?t.using.call(e,f):u.css(f)}},T.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){T.offset.setOffset(this,e,t)}));var t,n,i=this[0];return i?i.getClientRects().length?(t=i.getBoundingClientRect(),n=i.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,i=this[0],r={top:0,left:0};if("fixed"===T.css(i,"position"))t=i.getBoundingClientRect();else{for(t=this.offset(),n=i.ownerDocument,e=i.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===T.css(e,"position");)e=e.parentNode;e&&e!==i&&1===e.nodeType&&((r=T(e).offset()).top+=T.css(e,"borderTopWidth",!0),r.left+=T.css(e,"borderLeftWidth",!0))}return{top:t.top-r.top-T.css(i,"marginTop",!0),left:t.left-r.left-T.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent;e&&"static"===T.css(e,"position");)e=e.offsetParent;return e||se}))}}),T.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var n="pageYOffset"===t;T.fn[e]=function(i){return K(this,(function(e,i,r){var o;if(b(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===r)return o?o[t]:e[i];o?o.scrollTo(n?o.pageXOffset:r,n?r:o.pageYOffset):e[i]=r}),e,i,arguments.length)}})),T.each(["top","left"],(function(e,t){T.cssHooks[t]=ze(v.pixelPosition,(function(e,n){if(n)return n=Qe(e,t),Ve.test(n)?T(e).position()[t]+"px":n}))})),T.each({Height:"height",Width:"width"},(function(e,t){T.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,i){T.fn[i]=function(r,o){var s=arguments.length&&(n||"boolean"!=typeof r),a=n||(!0===r||!0===o?"margin":"border");return K(this,(function(t,n,r){var o;return b(t)?0===i.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===r?T.css(t,n,a):T.style(t,n,r,a)}),t,s?r:void 0,s)}}))})),T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){T.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}})),T.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),T.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),T.proxy=function(e,t){var n,i,r;if("string"==typeof t&&(n=e[t],t=e,e=n),y(e))return i=l.call(arguments,2),(r=function(){return e.apply(t||this,i.concat(l.call(arguments)))}).guid=e.guid=e.guid||T.guid++,r},T.holdReady=function(e){e?T.readyWait++:T.ready(!0)},T.isArray=Array.isArray,T.parseJSON=JSON.parse,T.nodeName=I,T.isFunction=y,T.isWindow=b,T.camelCase=Y,T.type=E,T.now=Date.now,T.isNumeric=function(e){var t=T.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},void 0===(i=function(){return T}.apply(t,[]))||(e.exports=i);var Jt=n.jQuery,Zt=n.$;return T.noConflict=function(e){return n.$===T&&(n.$=Zt),e&&n.jQuery===T&&(n.jQuery=Jt),T},r||(n.jQuery=n.$=T),T}))},function(e,t){}]);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/themes/custom/ge_unified/assets/js/ge_unified.script.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/libraries/slick-carousel/slick/slick.min.js. */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/libraries/slick-carousel/slick/slick.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/js/ge_com_unified.script.js. */
/*! For license information please see ge_com_unified.script.js.LICENSE.txt */
!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}([function(e,t,n){"use strict";n.r(t),function(e){var n="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,i=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(n&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();var r=n&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),i))}};function o(e){return e&&"[object Function]"==={}.toString.call(e)}function s(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function a(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function l(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=s(e),n=t.overflow,i=t.overflowX,r=t.overflowY;return/(auto|scroll|overlay)/.test(n+r+i)?e:l(a(e))}function c(e){return e&&e.referenceNode?e.referenceNode:e}var u=n&&!(!window.MSInputMethodContext||!document.documentMode),f=n&&/MSIE 10/.test(navigator.userAgent);function d(e){return 11===e?u:10===e?f:u||f}function h(e){if(!e)return document.documentElement;for(var t=d(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===s(n,"position")?h(n):n:e?e.ownerDocument.documentElement:document.documentElement}function p(e){return null!==e.parentNode?p(e.parentNode):e}function g(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?e:t,r=n?t:e,o=document.createRange();o.setStart(i,0),o.setEnd(r,0);var s,a,l=o.commonAncestorContainer;if(e!==l&&t!==l||i.contains(r))return"BODY"===(a=(s=l).nodeName)||"HTML"!==a&&h(s.firstElementChild)!==s?h(l):l;var c=p(e);return c.host?g(c.host,t):g(e,p(t).host)}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===t?"scrollTop":"scrollLeft",i=e.nodeName;if("BODY"===i||"HTML"===i){var r=e.ownerDocument.documentElement,o=e.ownerDocument.scrollingElement||r;return o[n]}return e[n]}function v(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=m(t,"top"),r=m(t,"left"),o=n?-1:1;return e.top+=i*o,e.bottom+=i*o,e.left+=r*o,e.right+=r*o,e}function y(e,t){var n="x"===t?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"])+parseFloat(e["border"+i+"Width"])}function b(e,t,n,i){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],d(10)?parseInt(n["offset"+e])+parseInt(i["margin"+("Height"===e?"Top":"Left")])+parseInt(i["margin"+("Height"===e?"Bottom":"Right")]):0)}function _(e){var t=e.body,n=e.documentElement,i=d(10)&&getComputedStyle(n);return{height:b("Height",t,n,i),width:b("Width",t,n,i)}}var w=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},E=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),C=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function x(e){return T({},e,{right:e.left+e.width,bottom:e.top+e.height})}function S(e){var t={};try{if(d(10)){t=e.getBoundingClientRect();var n=m(e,"top"),i=m(e,"left");t.top+=n,t.left+=i,t.bottom+=n,t.right+=i}else t=e.getBoundingClientRect()}catch(e){}var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},o="HTML"===e.nodeName?_(e.ownerDocument):{},a=o.width||e.clientWidth||r.width,l=o.height||e.clientHeight||r.height,c=e.offsetWidth-a,u=e.offsetHeight-l;if(c||u){var f=s(e);c-=y(f,"x"),u-=y(f,"y"),r.width-=c,r.height-=u}return x(r)}function D(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=d(10),r="HTML"===t.nodeName,o=S(e),a=S(t),c=l(e),u=s(t),f=parseFloat(u.borderTopWidth),h=parseFloat(u.borderLeftWidth);n&&r&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var p=x({top:o.top-a.top-f,left:o.left-a.left-h,width:o.width,height:o.height});if(p.marginTop=0,p.marginLeft=0,!i&&r){var g=parseFloat(u.marginTop),m=parseFloat(u.marginLeft);p.top-=f-g,p.bottom-=f-g,p.left-=h-m,p.right-=h-m,p.marginTop=g,p.marginLeft=m}return(i&&!n?t.contains(c):t===c&&"BODY"!==c.nodeName)&&(p=v(p,t)),p}function A(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,i=D(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),o=Math.max(n.clientHeight,window.innerHeight||0),s=t?0:m(n),a=t?0:m(n,"left"),l={top:s-i.top+i.marginTop,left:a-i.left+i.marginLeft,width:r,height:o};return x(l)}function N(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===s(e,"position"))return!0;var n=a(e);return!!n&&N(n)}function k(e){if(!e||!e.parentElement||d())return document.documentElement;for(var t=e.parentElement;t&&"none"===s(t,"transform");)t=t.parentElement;return t||document.documentElement}function I(e,t,n,i){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o={top:0,left:0},s=r?k(e):g(e,c(t));if("viewport"===i)o=A(s,r);else{var u=void 0;"scrollParent"===i?"BODY"===(u=l(a(t))).nodeName&&(u=e.ownerDocument.documentElement):u="window"===i?e.ownerDocument.documentElement:i;var f=D(u,s,r);if("HTML"!==u.nodeName||N(s))o=f;else{var d=_(e.ownerDocument),h=d.height,p=d.width;o.top+=f.top-f.marginTop,o.bottom=h+f.top,o.left+=f.left-f.marginLeft,o.right=p+f.left}}var m="number"==typeof(n=n||0);return o.left+=m?n:n.left||0,o.top+=m?n:n.top||0,o.right-=m?n:n.right||0,o.bottom-=m?n:n.bottom||0,o}function O(e){return e.width*e.height}function L(e,t,n,i,r){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var s=I(n,i,o,r),a={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},l=Object.keys(a).map((function(e){return T({key:e},a[e],{area:O(a[e])})})).sort((function(e,t){return t.area-e.area})),c=l.filter((function(e){var t=e.width,i=e.height;return t>=n.clientWidth&&i>=n.clientHeight})),u=c.length>0?c[0].key:l[0].key,f=e.split("-")[1];return u+(f?"-"+f:"")}function j(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=i?k(t):g(t,c(n));return D(n,r,i)}function P(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),i=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+i,height:e.offsetHeight+n}}function H(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function q(e,t,n){n=n.split("-")[0];var i=P(e),r={width:i.width,height:i.height},o=-1!==["right","left"].indexOf(n),s=o?"top":"left",a=o?"left":"top",l=o?"height":"width",c=o?"width":"height";return r[s]=t[s]+t[l]/2-i[l]/2,r[a]=n===a?t[a]-i[c]:t[H(a)],r}function R(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function M(e,t,n){return(void 0===n?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===n}));var i=R(e,(function(e){return e[t]===n}));return e.indexOf(i)}(e,"name",n))).forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&o(n)&&(t.offsets.popper=x(t.offsets.popper),t.offsets.reference=x(t.offsets.reference),t=n(t,e))})),t}function F(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=j(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=L(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=q(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=M(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some((function(e){var n=e.name;return e.enabled&&n===t}))}function B(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),i=0;i<t.length;i++){var r=t[i],o=r?""+r+n:e;if(void 0!==document.body.style[o])return o}return null}function U(){return this.state.isDestroyed=!0,W(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[B("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function Q(e){var t=e.ownerDocument;return t?t.defaultView:window}function K(e,t,n,i){n.updateBound=i,Q(e).addEventListener("resize",n.updateBound,{passive:!0});var r=l(e);return function e(t,n,i,r){var o="BODY"===t.nodeName,s=o?t.ownerDocument.defaultView:t;s.addEventListener(n,i,{passive:!0}),o||e(l(s.parentNode),n,i,r),r.push(s)}(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function z(){this.state.eventsEnabled||(this.state=K(this.reference,this.options,this.state,this.scheduleUpdate))}function $(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,Q(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function V(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function Y(e,t){Object.keys(t).forEach((function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&V(t[n])&&(i="px"),e.style[n]=t[n]+i}))}var X=n&&/Firefox/i.test(navigator.userAgent);function G(e,t,n){var i=R(e,(function(e){return e.name===t})),r=!!i&&e.some((function(e){return e.name===n&&e.enabled&&e.order<i.order}));if(!r){var o="`"+t+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+o+" modifier in order to work, be sure to include it before "+o+"!")}return r}var J=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],Z=J.slice(3);function ee(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Z.indexOf(e),i=Z.slice(n+1).concat(Z.slice(0,n));return t?i.reverse():i}var te="flip",ne="clockwise",ie="counterclockwise";function re(e,t,n,i){var r=[0,0],o=-1!==["right","left"].indexOf(i),s=e.split(/(\+|\-)/).map((function(e){return e.trim()})),a=s.indexOf(R(s,(function(e){return-1!==e.search(/,|\s/)})));s[a]&&-1===s[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==a?[s.slice(0,a).concat([s[a].split(l)[0]]),[s[a].split(l)[1]].concat(s.slice(a+1))]:[s];return(c=c.map((function(e,i){var r=(1===i?!o:o)?"height":"width",s=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,s=!0,e):s?(e[e.length-1]+=t,s=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,n,i){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+r[1],s=r[2];if(!o)return e;if(0===s.indexOf("%")){var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return x(a)[t]/100*o}if("vh"===s||"vw"===s){return("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*o}return o}(e,r,t,n)}))}))).forEach((function(e,t){e.forEach((function(n,i){V(n)&&(r[t]+=n*("-"===e[i-1]?-1:1))}))})),r}var oe={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],i=t.split("-")[1];if(i){var r=e.offsets,o=r.reference,s=r.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",u={start:C({},l,o[l]),end:C({},l,o[l]+o[c]-s[c])};e.offsets.popper=T({},s,u[i])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,i=e.placement,r=e.offsets,o=r.popper,s=r.reference,a=i.split("-")[0],l=void 0;return l=V(+n)?[+n,0]:re(n,o,s,a),"left"===a?(o.top+=l[0],o.left-=l[1]):"right"===a?(o.top+=l[0],o.left+=l[1]):"top"===a?(o.left+=l[0],o.top-=l[1]):"bottom"===a&&(o.left+=l[0],o.top+=l[1]),e.popper=o,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||h(e.instance.popper);e.instance.reference===n&&(n=h(n));var i=B("transform"),r=e.instance.popper.style,o=r.top,s=r.left,a=r[i];r.top="",r.left="",r[i]="";var l=I(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);r.top=o,r.left=s,r[i]=a,t.boundaries=l;var c=t.priority,u=e.offsets.popper,f={primary:function(e){var n=u[e];return u[e]<l[e]&&!t.escapeWithReference&&(n=Math.max(u[e],l[e])),C({},e,n)},secondary:function(e){var n="right"===e?"left":"top",i=u[n];return u[e]>l[e]&&!t.escapeWithReference&&(i=Math.min(u[n],l[e]-("right"===e?u.width:u.height))),C({},n,i)}};return c.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";u=T({},u,f[t](e))})),e.offsets.popper=u,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,i=t.reference,r=e.placement.split("-")[0],o=Math.floor,s=-1!==["top","bottom"].indexOf(r),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<o(i[l])&&(e.offsets.popper[l]=o(i[l])-n[c]),n[l]>o(i[a])&&(e.offsets.popper[l]=o(i[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!G(e.instance.modifiers,"arrow","keepTogether"))return e;var i=t.element;if("string"==typeof i){if(!(i=e.instance.popper.querySelector(i)))return e}else if(!e.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var r=e.placement.split("-")[0],o=e.offsets,a=o.popper,l=o.reference,c=-1!==["left","right"].indexOf(r),u=c?"height":"width",f=c?"Top":"Left",d=f.toLowerCase(),h=c?"left":"top",p=c?"bottom":"right",g=P(i)[u];l[p]-g<a[d]&&(e.offsets.popper[d]-=a[d]-(l[p]-g)),l[d]+g>a[p]&&(e.offsets.popper[d]+=l[d]+g-a[p]),e.offsets.popper=x(e.offsets.popper);var m=l[d]+l[u]/2-g/2,v=s(e.instance.popper),y=parseFloat(v["margin"+f]),b=parseFloat(v["border"+f+"Width"]),_=m-e.offsets.popper[d]-y-b;return _=Math.max(Math.min(a[u]-g,_),0),e.arrowElement=i,e.offsets.arrow=(C(n={},d,Math.round(_)),C(n,h,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=I(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),i=e.placement.split("-")[0],r=H(i),o=e.placement.split("-")[1]||"",s=[];switch(t.behavior){case te:s=[i,r];break;case ne:s=ee(i);break;case ie:s=ee(i,!0);break;default:s=t.behavior}return s.forEach((function(a,l){if(i!==a||s.length===l+1)return e;i=e.placement.split("-")[0],r=H(i);var c=e.offsets.popper,u=e.offsets.reference,f=Math.floor,d="left"===i&&f(c.right)>f(u.left)||"right"===i&&f(c.left)<f(u.right)||"top"===i&&f(c.bottom)>f(u.top)||"bottom"===i&&f(c.top)<f(u.bottom),h=f(c.left)<f(n.left),p=f(c.right)>f(n.right),g=f(c.top)<f(n.top),m=f(c.bottom)>f(n.bottom),v="left"===i&&h||"right"===i&&p||"top"===i&&g||"bottom"===i&&m,y=-1!==["top","bottom"].indexOf(i),b=!!t.flipVariations&&(y&&"start"===o&&h||y&&"end"===o&&p||!y&&"start"===o&&g||!y&&"end"===o&&m),_=!!t.flipVariationsByContent&&(y&&"start"===o&&p||y&&"end"===o&&h||!y&&"start"===o&&m||!y&&"end"===o&&g),w=b||_;(d||v||w)&&(e.flipped=!0,(d||v)&&(i=s[l+1]),w&&(o=function(e){return"end"===e?"start":"start"===e?"end":e}(o)),e.placement=i+(o?"-"+o:""),e.offsets.popper=T({},e.offsets.popper,q(e.instance.popper,e.offsets.reference,e.placement)),e=M(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],i=e.offsets,r=i.popper,o=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[s?"left":"top"]=o[n]-(a?r[s?"width":"height"]:0),e.placement=H(t),e.offsets.popper=x(r),e}},hide:{order:800,enabled:!0,fn:function(e){if(!G(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=R(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,i=t.y,r=e.offsets.popper,o=R(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==o&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s=void 0!==o?o:t.gpuAcceleration,a=h(e.instance.popper),l=S(a),c={position:r.position},u=function(e,t){var n=e.offsets,i=n.popper,r=n.reference,o=Math.round,s=Math.floor,a=function(e){return e},l=o(r.width),c=o(i.width),u=-1!==["left","right"].indexOf(e.placement),f=-1!==e.placement.indexOf("-"),d=t?u||f||l%2==c%2?o:s:a,h=t?o:a;return{left:d(l%2==1&&c%2==1&&!f&&t?i.left-1:i.left),top:h(i.top),bottom:h(i.bottom),right:d(i.right)}}(e,window.devicePixelRatio<2||!X),f="bottom"===n?"top":"bottom",d="right"===i?"left":"right",p=B("transform"),g=void 0,m=void 0;if(m="bottom"===f?"HTML"===a.nodeName?-a.clientHeight+u.bottom:-l.height+u.bottom:u.top,g="right"===d?"HTML"===a.nodeName?-a.clientWidth+u.right:-l.width+u.right:u.left,s&&p)c[p]="translate3d("+g+"px, "+m+"px, 0)",c[f]=0,c[d]=0,c.willChange="transform";else{var v="bottom"===f?-1:1,y="right"===d?-1:1;c[f]=m*v,c[d]=g*y,c.willChange=f+", "+d}var b={"x-placement":e.placement};return e.attributes=T({},b,e.attributes),e.styles=T({},c,e.styles),e.arrowStyles=T({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,n;return Y(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach((function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&Y(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,i,r){var o=j(r,t,e,n.positionFixed),s=L(n.placement,o,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",s),Y(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},se=function(){function e(t,n){var i=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};w(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=r(this.update.bind(this)),this.options=T({},e.Defaults,s),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(T({},e.Defaults.modifiers,s.modifiers)).forEach((function(t){i.options.modifiers[t]=T({},e.Defaults.modifiers[t]||{},s.modifiers?s.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return T({name:e},i.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&o(e.onLoad)&&e.onLoad(i.reference,i.popper,i.options,e,i.state)})),this.update();var a=this.options.eventsEnabled;a&&this.enableEventListeners(),this.state.eventsEnabled=a}return E(e,[{key:"update",value:function(){return F.call(this)}},{key:"destroy",value:function(){return U.call(this)}},{key:"enableEventListeners",value:function(){return z.call(this)}},{key:"disableEventListeners",value:function(){return $.call(this)}}]),e}();se.Utils=("undefined"!=typeof window?window:e).PopperUtils,se.placements=J,se.Defaults=oe,t.default=se}.call(this,n(5))},function(e,t,n){n(2),e.exports=n(6)},function(e,t,n){"use strict";n.r(t);n(3);!function(e){function t(){e(".grid-tile");e(".pannel_download").click((function(t){e(this).parents(".grid-tile").removeClass("panel_active"),e(this).parents(".grid-tile").toggleClass("panel_active")})),e(".pannel_download.back").click((function(t){e(this).parents(".grid-tile").removeClass("panel_active")}))}e(document).ready((function(){if(e(document).ajaxComplete((function(n){t(),function(t){if(e(t)){var n="";e(t).each((function(t){e(this).height("auto")})),e(t).each((function(t){(""==n||n<e(this).height())&&(n=e(this).height())})),e(t).each((function(t){e(this).height(n)}))}}(e("#governance-landing-cards  .card-body-leader")),e("#governance-clear-filter").click((function(){e(".governance-exposed select").val("All").trigger("change")}))})),e("[data-attribute-replace]").length>0){var n="";e("[data-attribute-replace=true]").each((function(t){if(n=(n=e(this).attr("data-attribute-replace-id")).replace("replace_",""),e('[data-attribute-replace-id="'+n+'"]').length>0)e('[data-attribute-replace-id="'+n+'"]').replaceWith(e(this)),e(this).addClass("active");else{var i="block--views-block--"+e(this).attr("data-attribute-replace-id");i="."+i.replace(/_/g,"-"),e(this).parents(i).remove()}}))}e("#governance-clear-filter").click((function(){e(".governance-exposed select").val("All").trigger("change")}))})),t(),Drupal.behaviors.ge_com_unified_script={attach:function(t,n){if(e("#webform-submission-general-inquiry-add-form",t).ready((function(){e("#webform-submission-general-inquiry-add-form",t).find("div.webform-confirmation").length>0&&dataLayer.push({event:"formSubmit",eventCategory:"forms",eventAction:"contact us form interaction",eventLabel:"successful form submit",formName:"GE - Contact us",formMessage:"Thank you"})})),e("#webform-submission-business-add-form",t).ready((function(){e("#webform-submission-business-add-form",t).find("div.webform-confirmation").length>0&&dataLayer.push({event:"formSubmit",eventCategory:"forms",eventAction:"contact us form interaction",eventLabel:"successful form submit",formName:"GE - Contact us",formMessage:"Thank you"})})),e("#webform-submission-careers-add-form",t).ready((function(){e("#webform-submission-careers-add-form",t).find("div.webform-confirmation").length>0&&dataLayer.push({event:"formSubmit",eventCategory:"forms",eventAction:"contact us form interaction",eventLabel:"successful form submit",formName:"GE - Contact us",formMessage:"Thank you"})})),e("#webform-submission-press-add-form",t).ready((function(){e("#webform-submission-press-add-form",t).find("div.webform-confirmation").length>0&&dataLayer.push({event:"formSubmit",eventCategory:"forms",eventAction:"contact us form interaction",eventLabel:"successful form submit",formName:"GE - Contact us",formMessage:"Thank you"})})),e(".social-media-links--platforms.platforms.vertical a",t).click((function(){var t=e(this).attr("title");"General Electric Facebook page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"facebook",sharedContent:"profile homepage",pageLocation:"left sidebar"}),"General Electric Twitter page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"twitter",sharedContent:"profile homepage",pageLocation:"left sidebar"}),"General Electric LinkedIn page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"linkedin",sharedContent:"profile homepage",pageLocation:"left sidebar"})})),e("footer .social-media-links--platforms.platforms.inline.horizontal a",t).click((function(){var t=e(this).attr("title");"General Electric Facebook page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"facebook",sharedContent:"profile homepage",pageLocation:"footer"}),"General Electric Twitter page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"twitter",sharedContent:"profile homepage",pageLocation:"footer"}),"General Electric LinkedIn page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"linkedin",sharedContent:"profile homepage",pageLocation:"footer"}),"General Electric YouTube page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"youtube",sharedContent:"profile homepage",pageLocation:"footer"}),"General Electric Instagram page"==t&&dataLayer.push({event:"socialShare",eventCategory:"content",eventAction:"social share intention",socialPlatform:"instagram",sharedContent:"profile homepage",pageLocation:"footer"})})),e(".events-reports-wrapper .generic_slick")){var i="";e(".events-reports-wrapper .generic_slick .card_wrapper.equalize-height-wrapper",t).each((function(t){(""==i||i<e(this).outerHeight())&&(i=e(this).outerHeight())})),e(".events-reports-wrapper .generic_slick .card_wrapper.equalize-height-wrapper",t).outerHeight(i)}function r(){if(e(".ge-investor-subnavigation").length>0){e(".ge-investor-subnavigation .sub-nav-qualize a",t).each((function(t){e(this).removeAttr("style")}));var n=window.location.pathname,i=0,r=0;e(".ge-investor-subnavigation .sub-nav-qualize a",t).each((function(t){var o=e(this).attr("href");n==o&&(e(this).removeClass("button-secondary-light"),e(this).addClass("button-primary"));var s=e(this).text().length;s>=i&&(i=s,e(this).width()>=r&&(r=e(this).width()))})),e(".ge-investor-subnavigation .sub-nav-qualize a",t).each((function(t){e(this).width(r)}))}}r(),e(window,t).resize((function(){r()}))}},e(window).bind("load resize",(function(){e("div.block--covid19banner").length&&e(window).width()<768&&e("div.landing-page main.ge-main").css("padding-top","60px")})),jQuery(".evidon_cookie").click((function(){event.preventDefault(),window.evidon.notice.showOptions()})),e(".diversity-data-container .diversity-data-select #edit-field-data-value").change((function(){var t=e(".diversity-data-container .diversity-data-select #edit-field-data-value option:selected").val();e(".diversity-data-container .diversity-data-select #edit-field-data-value option").each((function(){e(this).val()==t?e(".diversity-data-container .diversity-data-table ."+t).addClass("active"):e(".diversity-data-container .diversity-data-table ."+e(this).val()).removeClass("active")}))})),jQuery(document).ready((function(){jQuery('a[target="_blank"]').each((function(){if(jQuery(this).attr("title")){var e;e=jQuery(this).attr("title"),jQuery(this).attr("title",""),jQuery(this).attr("title",e+" (Opens in a new browser tab)")}else{"Opens in a new browser tab.",jQuery(this).attr("title","Opens in a new browser tab.")}}))}))}(jQuery)},function(e,t,n){!function(e,t,n){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),i.forEach((function(t){o(e,t,n[t])}))}return e}function a(e){var n=this,i=!1;return t(this).one(l.TRANSITION_END,(function(){i=!0})),setTimeout((function(){i||l.triggerTransitionEnd(n)}),e),this}t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n;var l={TRANSITION_END:"bsTransitionEnd",getUID:function(e){do{e+=~~(1e6*Math.random())}while(document.getElementById(e));return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target");if(!t||"#"===t){var n=e.getAttribute("href");t=n&&"#"!==n?n.trim():""}try{return document.querySelector(t)?t:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var n=t(e).css("transition-duration"),i=t(e).css("transition-delay"),r=parseFloat(n),o=parseFloat(i);return r||o?(n=n.split(",")[0],i=i.split(",")[0],1e3*(parseFloat(n)+parseFloat(i))):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger("transitionend")},supportsTransitionEnd:function(){return Boolean("transitionend")},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var r=n[i],o=t[i],s=o&&l.isElement(o)?"element":(a=o,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(r).test(s))throw new Error(e.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+r+'".')}var a},findShadowRoot:function(e){if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){var t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?l.findShadowRoot(e.parentNode):null}};t.fn.emulateTransitionEnd=a,t.event.special[l.TRANSITION_END]={bindType:"transitionend",delegateType:"transitionend",handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}};var c="alert",u=t.fn[c],f={CLOSE:"close.bs.alert",CLOSED:"closed.bs.alert",CLICK_DATA_API:"click.bs.alert.data-api"},d="alert",h="fade",p="show",g=function(){function e(e){this._element=e}var n=e.prototype;return n.close=function(e){var t=this._element;e&&(t=this._getRootElement(e)),this._triggerCloseEvent(t).isDefaultPrevented()||this._removeElement(t)},n.dispose=function(){t.removeData(this._element,"bs.alert"),this._element=null},n._getRootElement=function(e){var n=l.getSelectorFromElement(e),i=!1;return n&&(i=document.querySelector(n)),i||(i=t(e).closest("."+d)[0]),i},n._triggerCloseEvent=function(e){var n=t.Event(f.CLOSE);return t(e).trigger(n),n},n._removeElement=function(e){var n=this;if(t(e).removeClass(p),t(e).hasClass(h)){var i=l.getTransitionDurationFromElement(e);t(e).one(l.TRANSITION_END,(function(t){return n._destroyElement(e,t)})).emulateTransitionEnd(i)}else this._destroyElement(e)},n._destroyElement=function(e){t(e).detach().trigger(f.CLOSED).remove()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.alert");r||(r=new e(this),i.data("bs.alert",r)),"close"===n&&r[n](this)}))},e._handleDismiss=function(e){return function(t){t&&t.preventDefault(),e.close(this)}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(f.CLICK_DATA_API,'[data-dismiss="alert"]',g._handleDismiss(new g)),t.fn[c]=g._jQueryInterface,t.fn[c].Constructor=g,t.fn[c].noConflict=function(){return t.fn[c]=u,g._jQueryInterface};var m=t.fn.button,v="active",y="btn",b="focus",_='[data-toggle^="button"]',w='[data-toggle="buttons"]',E='input:not([type="hidden"])',C=".active",T=".btn",x={CLICK_DATA_API:"click.bs.button.data-api",FOCUS_BLUR_DATA_API:"focus.bs.button.data-api blur.bs.button.data-api"},S=function(){function e(e){this._element=e}var n=e.prototype;return n.toggle=function(){var e=!0,n=!0,i=t(this._element).closest(w)[0];if(i){var r=this._element.querySelector(E);if(r){if("radio"===r.type)if(r.checked&&this._element.classList.contains(v))e=!1;else{var o=i.querySelector(C);o&&t(o).removeClass(v)}if(e){if(r.hasAttribute("disabled")||i.hasAttribute("disabled")||r.classList.contains("disabled")||i.classList.contains("disabled"))return;r.checked=!this._element.classList.contains(v),t(r).trigger("change")}r.focus(),n=!1}}n&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(v)),e&&t(this._element).toggleClass(v)},n.dispose=function(){t.removeData(this._element,"bs.button"),this._element=null},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.button");i||(i=new e(this),t(this).data("bs.button",i)),"toggle"===n&&i[n]()}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(x.CLICK_DATA_API,_,(function(e){e.preventDefault();var n=e.target;t(n).hasClass(y)||(n=t(n).closest(T)),S._jQueryInterface.call(t(n),"toggle")})).on(x.FOCUS_BLUR_DATA_API,_,(function(e){var n=t(e.target).closest(T)[0];t(n).toggleClass(b,/^focus(in)?$/.test(e.type))})),t.fn.button=S._jQueryInterface,t.fn.button.Constructor=S,t.fn.button.noConflict=function(){return t.fn.button=m,S._jQueryInterface};var D="carousel",A=".bs.carousel",N=t.fn[D],k={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},I={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},O="next",L="prev",j="left",P="right",H={SLIDE:"slide"+A,SLID:"slid"+A,KEYDOWN:"keydown"+A,MOUSEENTER:"mouseenter"+A,MOUSELEAVE:"mouseleave"+A,TOUCHSTART:"touchstart"+A,TOUCHMOVE:"touchmove"+A,TOUCHEND:"touchend"+A,POINTERDOWN:"pointerdown"+A,POINTERUP:"pointerup"+A,DRAG_START:"dragstart"+A,LOAD_DATA_API:"load"+A+".data-api",CLICK_DATA_API:"click"+A+".data-api"},q="carousel",R="active",M="slide",F="carousel-item-right",W="carousel-item-left",B="carousel-item-next",U="carousel-item-prev",Q="pointer-event",K=".active",z=".active.carousel-item",$=".carousel-item",V=".carousel-item img",Y=".carousel-item-next, .carousel-item-prev",X=".carousel-indicators",G="[data-slide], [data-slide-to]",J='[data-ride="carousel"]',Z={TOUCH:"touch",PEN:"pen"},ee=function(){function e(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(X),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var n=e.prototype;return n.next=function(){this._isSliding||this._slide(O)},n.nextWhenVisible=function(){!document.hidden&&t(this._element).is(":visible")&&"hidden"!==t(this._element).css("visibility")&&this.next()},n.prev=function(){this._isSliding||this._slide(L)},n.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(Y)&&(l.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},n.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},n.to=function(e){var n=this;this._activeElement=this._element.querySelector(z);var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)t(this._element).one(H.SLID,(function(){return n.to(e)}));else{if(i===e)return this.pause(),void this.cycle();var r=e>i?O:L;this._slide(r,this._items[e])}},n.dispose=function(){t(this._element).off(A),t.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},n._getConfig=function(e){return e=s({},k,e),l.typeCheckConfig(D,e,I),e},n._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);if(!(e<=40)){var t=e/this.touchDeltaX;t>0&&this.prev(),t<0&&this.next()}},n._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(H.KEYDOWN,(function(t){return e._keydown(t)})),"hover"===this._config.pause&&t(this._element).on(H.MOUSEENTER,(function(t){return e.pause(t)})).on(H.MOUSELEAVE,(function(t){return e.cycle(t)})),this._config.touch&&this._addTouchEventListeners()},n._addTouchEventListeners=function(){var e=this;if(this._touchSupported){var n=function(t){e._pointerEvent&&Z[t.originalEvent.pointerType.toUpperCase()]?e.touchStartX=t.originalEvent.clientX:e._pointerEvent||(e.touchStartX=t.originalEvent.touches[0].clientX)},i=function(t){e._pointerEvent&&Z[t.originalEvent.pointerType.toUpperCase()]&&(e.touchDeltaX=t.originalEvent.clientX-e.touchStartX),e._handleSwipe(),"hover"===e._config.pause&&(e.pause(),e.touchTimeout&&clearTimeout(e.touchTimeout),e.touchTimeout=setTimeout((function(t){return e.cycle(t)}),500+e._config.interval))};t(this._element.querySelectorAll(V)).on(H.DRAG_START,(function(e){return e.preventDefault()})),this._pointerEvent?(t(this._element).on(H.POINTERDOWN,(function(e){return n(e)})),t(this._element).on(H.POINTERUP,(function(e){return i(e)})),this._element.classList.add(Q)):(t(this._element).on(H.TOUCHSTART,(function(e){return n(e)})),t(this._element).on(H.TOUCHMOVE,(function(t){return function(t){t.originalEvent.touches&&t.originalEvent.touches.length>1?e.touchDeltaX=0:e.touchDeltaX=t.originalEvent.touches[0].clientX-e.touchStartX}(t)})),t(this._element).on(H.TOUCHEND,(function(e){return i(e)})))}},n._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},n._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll($)):[],this._items.indexOf(e)},n._getItemByDirection=function(e,t){var n=e===O,i=e===L,r=this._getItemIndex(t),o=this._items.length-1;if((i&&0===r||n&&r===o)&&!this._config.wrap)return t;var s=(r+(e===L?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},n._triggerSlideEvent=function(e,n){var i=this._getItemIndex(e),r=this._getItemIndex(this._element.querySelector(z)),o=t.Event(H.SLIDE,{relatedTarget:e,direction:n,from:r,to:i});return t(this._element).trigger(o),o},n._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var n=[].slice.call(this._indicatorsElement.querySelectorAll(K));t(n).removeClass(R);var i=this._indicatorsElement.children[this._getItemIndex(e)];i&&t(i).addClass(R)}},n._slide=function(e,n){var i,r,o,s=this,a=this._element.querySelector(z),c=this._getItemIndex(a),u=n||a&&this._getItemByDirection(e,a),f=this._getItemIndex(u),d=Boolean(this._interval);if(e===O?(i=W,r=B,o=j):(i=F,r=U,o=P),u&&t(u).hasClass(R))this._isSliding=!1;else if(!this._triggerSlideEvent(u,o).isDefaultPrevented()&&a&&u){this._isSliding=!0,d&&this.pause(),this._setActiveIndicatorElement(u);var h=t.Event(H.SLID,{relatedTarget:u,direction:o,from:c,to:f});if(t(this._element).hasClass(M)){t(u).addClass(r),l.reflow(u),t(a).addClass(i),t(u).addClass(i);var p=parseInt(u.getAttribute("data-interval"),10);p?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=p):this._config.interval=this._config.defaultInterval||this._config.interval;var g=l.getTransitionDurationFromElement(a);t(a).one(l.TRANSITION_END,(function(){t(u).removeClass(i+" "+r).addClass(R),t(a).removeClass(R+" "+r+" "+i),s._isSliding=!1,setTimeout((function(){return t(s._element).trigger(h)}),0)})).emulateTransitionEnd(g)}else t(a).removeClass(R),t(u).addClass(R),this._isSliding=!1,t(this._element).trigger(h);d&&this.cycle()}},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.carousel"),r=s({},k,t(this).data());"object"==typeof n&&(r=s({},r,n));var o="string"==typeof n?n:r.slide;if(i||(i=new e(this,r),t(this).data("bs.carousel",i)),"number"==typeof n)i.to(n);else if("string"==typeof o){if(void 0===i[o])throw new TypeError('No method named "'+o+'"');i[o]()}else r.interval&&r.ride&&(i.pause(),i.cycle())}))},e._dataApiClickHandler=function(n){var i=l.getSelectorFromElement(this);if(i){var r=t(i)[0];if(r&&t(r).hasClass(q)){var o=s({},t(r).data(),t(this).data()),a=this.getAttribute("data-slide-to");a&&(o.interval=!1),e._jQueryInterface.call(t(r),o),a&&t(r).data("bs.carousel").to(a),n.preventDefault()}}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return k}}]),e}();t(document).on(H.CLICK_DATA_API,G,ee._dataApiClickHandler),t(window).on(H.LOAD_DATA_API,(function(){for(var e=[].slice.call(document.querySelectorAll(J)),n=0,i=e.length;n<i;n++){var r=t(e[n]);ee._jQueryInterface.call(r,r.data())}})),t.fn[D]=ee._jQueryInterface,t.fn[D].Constructor=ee,t.fn[D].noConflict=function(){return t.fn[D]=N,ee._jQueryInterface};var te="collapse",ne=t.fn[te],ie={toggle:!0,parent:""},re={toggle:"boolean",parent:"(string|element)"},oe={SHOW:"show.bs.collapse",SHOWN:"shown.bs.collapse",HIDE:"hide.bs.collapse",HIDDEN:"hidden.bs.collapse",CLICK_DATA_API:"click.bs.collapse.data-api"},se="show",ae="collapse",le="collapsing",ce="collapsed",ue="width",fe="height",de=".show, .collapsing",he='[data-toggle="collapse"]',pe=function(){function e(e,t){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(t),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(he)),i=0,r=n.length;i<r;i++){var o=n[i],s=l.getSelectorFromElement(o),a=[].slice.call(document.querySelectorAll(s)).filter((function(t){return t===e}));null!==s&&a.length>0&&(this._selector=s,this._triggerArray.push(o))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var n=e.prototype;return n.toggle=function(){t(this._element).hasClass(se)?this.hide():this.show()},n.show=function(){var n,i,r=this;if(!(this._isTransitioning||t(this._element).hasClass(se)||(this._parent&&0===(n=[].slice.call(this._parent.querySelectorAll(de)).filter((function(e){return"string"==typeof r._config.parent?e.getAttribute("data-parent")===r._config.parent:e.classList.contains(ae)}))).length&&(n=null),n&&(i=t(n).not(this._selector).data("bs.collapse"))&&i._isTransitioning))){var o=t.Event(oe.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){n&&(e._jQueryInterface.call(t(n).not(this._selector),"hide"),i||t(n).data("bs.collapse",null));var s=this._getDimension();t(this._element).removeClass(ae).addClass(le),this._element.style[s]=0,this._triggerArray.length&&t(this._triggerArray).removeClass(ce).attr("aria-expanded",!0),this.setTransitioning(!0);var a="scroll"+(s[0].toUpperCase()+s.slice(1)),c=l.getTransitionDurationFromElement(this._element);t(this._element).one(l.TRANSITION_END,(function(){t(r._element).removeClass(le).addClass(ae).addClass(se),r._element.style[s]="",r.setTransitioning(!1),t(r._element).trigger(oe.SHOWN)})).emulateTransitionEnd(c),this._element.style[s]=this._element[a]+"px"}}},n.hide=function(){var e=this;if(!this._isTransitioning&&t(this._element).hasClass(se)){var n=t.Event(oe.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",l.reflow(this._element),t(this._element).addClass(le).removeClass(ae).removeClass(se);var r=this._triggerArray.length;if(r>0)for(var o=0;o<r;o++){var s=this._triggerArray[o],a=l.getSelectorFromElement(s);null!==a&&(t([].slice.call(document.querySelectorAll(a))).hasClass(se)||t(s).addClass(ce).attr("aria-expanded",!1))}this.setTransitioning(!0),this._element.style[i]="";var c=l.getTransitionDurationFromElement(this._element);t(this._element).one(l.TRANSITION_END,(function(){e.setTransitioning(!1),t(e._element).removeClass(le).addClass(ae).trigger(oe.HIDDEN)})).emulateTransitionEnd(c)}}},n.setTransitioning=function(e){this._isTransitioning=e},n.dispose=function(){t.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},n._getConfig=function(e){return(e=s({},ie,e)).toggle=Boolean(e.toggle),l.typeCheckConfig(te,e,re),e},n._getDimension=function(){return t(this._element).hasClass(ue)?ue:fe},n._getParent=function(){var n,i=this;l.isElement(this._config.parent)?(n=this._config.parent,void 0!==this._config.parent.jquery&&(n=this._config.parent[0])):n=document.querySelector(this._config.parent);var r='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',o=[].slice.call(n.querySelectorAll(r));return t(o).each((function(t,n){i._addAriaAndCollapsedClass(e._getTargetFromElement(n),[n])})),n},n._addAriaAndCollapsedClass=function(e,n){var i=t(e).hasClass(se);n.length&&t(n).toggleClass(ce,!i).attr("aria-expanded",i)},e._getTargetFromElement=function(e){var t=l.getSelectorFromElement(e);return t?document.querySelector(t):null},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.collapse"),o=s({},ie,i.data(),"object"==typeof n&&n?n:{});if(!r&&o.toggle&&/show|hide/.test(n)&&(o.toggle=!1),r||(r=new e(this,o),i.data("bs.collapse",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return ie}}]),e}();t(document).on(oe.CLICK_DATA_API,he,(function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var n=t(this),i=l.getSelectorFromElement(this),r=[].slice.call(document.querySelectorAll(i));t(r).each((function(){var e=t(this),i=e.data("bs.collapse")?"toggle":n.data();pe._jQueryInterface.call(e,i)}))})),t.fn[te]=pe._jQueryInterface,t.fn[te].Constructor=pe,t.fn[te].noConflict=function(){return t.fn[te]=ne,pe._jQueryInterface};var ge="dropdown",me=t.fn[ge],ve=new RegExp("38|40|27"),ye={HIDE:"hide.bs.dropdown",HIDDEN:"hidden.bs.dropdown",SHOW:"show.bs.dropdown",SHOWN:"shown.bs.dropdown",CLICK:"click.bs.dropdown",CLICK_DATA_API:"click.bs.dropdown.data-api",KEYDOWN_DATA_API:"keydown.bs.dropdown.data-api",KEYUP_DATA_API:"keyup.bs.dropdown.data-api"},be="disabled",_e="show",we="dropup",Ee="dropright",Ce="dropleft",Te="dropdown-menu-right",xe="position-static",Se='[data-toggle="dropdown"]',De=".dropdown form",Ae=".dropdown-menu",Ne=".navbar-nav",ke=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Ie="top-start",Oe="top-end",Le="bottom-start",je="bottom-end",Pe="right-start",He="left-start",qe={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},Re={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},Me=function(){function e(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var i=e.prototype;return i.toggle=function(){if(!this._element.disabled&&!t(this._element).hasClass(be)){var i=e._getParentFromElement(this._element),r=t(this._menu).hasClass(_e);if(e._clearMenus(),!r){var o={relatedTarget:this._element},s=t.Event(ye.SHOW,o);if(t(i).trigger(s),!s.isDefaultPrevented()){if(!this._inNavbar){if(void 0===n)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var a=this._element;"parent"===this._config.reference?a=i:l.isElement(this._config.reference)&&(a=this._config.reference,void 0!==this._config.reference.jquery&&(a=this._config.reference[0])),"scrollParent"!==this._config.boundary&&t(i).addClass(xe),this._popper=new n(a,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===t(i).closest(Ne).length&&t(document.body).children().on("mouseover",null,t.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),t(this._menu).toggleClass(_e),t(i).toggleClass(_e).trigger(t.Event(ye.SHOWN,o))}}}},i.show=function(){if(!(this._element.disabled||t(this._element).hasClass(be)||t(this._menu).hasClass(_e))){var n={relatedTarget:this._element},i=t.Event(ye.SHOW,n),r=e._getParentFromElement(this._element);t(r).trigger(i),i.isDefaultPrevented()||(t(this._menu).toggleClass(_e),t(r).toggleClass(_e).trigger(t.Event(ye.SHOWN,n)))}},i.hide=function(){if(!this._element.disabled&&!t(this._element).hasClass(be)&&t(this._menu).hasClass(_e)){var n={relatedTarget:this._element},i=t.Event(ye.HIDE,n),r=e._getParentFromElement(this._element);t(r).trigger(i),i.isDefaultPrevented()||(t(this._menu).toggleClass(_e),t(r).toggleClass(_e).trigger(t.Event(ye.HIDDEN,n)))}},i.dispose=function(){t.removeData(this._element,"bs.dropdown"),t(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},i.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},i._addEventListeners=function(){var e=this;t(this._element).on(ye.CLICK,(function(t){t.preventDefault(),t.stopPropagation(),e.toggle()}))},i._getConfig=function(e){return e=s({},this.constructor.Default,t(this._element).data(),e),l.typeCheckConfig(ge,e,this.constructor.DefaultType),e},i._getMenuElement=function(){if(!this._menu){var t=e._getParentFromElement(this._element);t&&(this._menu=t.querySelector(Ae))}return this._menu},i._getPlacement=function(){var e=t(this._element.parentNode),n=Le;return e.hasClass(we)?(n=Ie,t(this._menu).hasClass(Te)&&(n=Oe)):e.hasClass(Ee)?n=Pe:e.hasClass(Ce)?n=He:t(this._menu).hasClass(Te)&&(n=je),n},i._detectNavbar=function(){return t(this._element).closest(".navbar").length>0},i._getOffset=function(){var e=this,t={};return"function"==typeof this._config.offset?t.fn=function(t){return t.offsets=s({},t.offsets,e._config.offset(t.offsets,e._element)||{}),t}:t.offset=this._config.offset,t},i._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(e.modifiers.applyStyle={enabled:!1}),e},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.dropdown");if(i||(i=new e(this,"object"==typeof n?n:null),t(this).data("bs.dropdown",i)),"string"==typeof n){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},e._clearMenus=function(n){if(!n||3!==n.which&&("keyup"!==n.type||9===n.which))for(var i=[].slice.call(document.querySelectorAll(Se)),r=0,o=i.length;r<o;r++){var s=e._getParentFromElement(i[r]),a=t(i[r]).data("bs.dropdown"),l={relatedTarget:i[r]};if(n&&"click"===n.type&&(l.clickEvent=n),a){var c=a._menu;if(t(s).hasClass(_e)&&!(n&&("click"===n.type&&/input|textarea/i.test(n.target.tagName)||"keyup"===n.type&&9===n.which)&&t.contains(s,n.target))){var u=t.Event(ye.HIDE,l);t(s).trigger(u),u.isDefaultPrevented()||("ontouchstart"in document.documentElement&&t(document.body).children().off("mouseover",null,t.noop),i[r].setAttribute("aria-expanded","false"),t(c).removeClass(_e),t(s).removeClass(_e).trigger(t.Event(ye.HIDDEN,l)))}}}},e._getParentFromElement=function(e){var t,n=l.getSelectorFromElement(e);return n&&(t=document.querySelector(n)),t||e.parentNode},e._dataApiKeydownHandler=function(n){if(!(/input|textarea/i.test(n.target.tagName)?32===n.which||27!==n.which&&(40!==n.which&&38!==n.which||t(n.target).closest(Ae).length):!ve.test(n.which))&&(n.preventDefault(),n.stopPropagation(),!this.disabled&&!t(this).hasClass(be))){var i=e._getParentFromElement(this),r=t(i).hasClass(_e);if(r&&(!r||27!==n.which&&32!==n.which)){var o=[].slice.call(i.querySelectorAll(ke));if(0!==o.length){var s=o.indexOf(n.target);38===n.which&&s>0&&s--,40===n.which&&s<o.length-1&&s++,s<0&&(s=0),o[s].focus()}}else{if(27===n.which){var a=i.querySelector(Se);t(a).trigger("focus")}t(this).trigger("click")}}},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return qe}},{key:"DefaultType",get:function(){return Re}}]),e}();t(document).on(ye.KEYDOWN_DATA_API,Se,Me._dataApiKeydownHandler).on(ye.KEYDOWN_DATA_API,Ae,Me._dataApiKeydownHandler).on(ye.CLICK_DATA_API+" "+ye.KEYUP_DATA_API,Me._clearMenus).on(ye.CLICK_DATA_API,Se,(function(e){e.preventDefault(),e.stopPropagation(),Me._jQueryInterface.call(t(this),"toggle")})).on(ye.CLICK_DATA_API,De,(function(e){e.stopPropagation()})),t.fn[ge]=Me._jQueryInterface,t.fn[ge].Constructor=Me,t.fn[ge].noConflict=function(){return t.fn[ge]=me,Me._jQueryInterface};var Fe=t.fn.modal,We={backdrop:!0,keyboard:!0,focus:!0,show:!0},Be={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},Ue={HIDE:"hide.bs.modal",HIDDEN:"hidden.bs.modal",SHOW:"show.bs.modal",SHOWN:"shown.bs.modal",FOCUSIN:"focusin.bs.modal",RESIZE:"resize.bs.modal",CLICK_DISMISS:"click.dismiss.bs.modal",KEYDOWN_DISMISS:"keydown.dismiss.bs.modal",MOUSEUP_DISMISS:"mouseup.dismiss.bs.modal",MOUSEDOWN_DISMISS:"mousedown.dismiss.bs.modal",CLICK_DATA_API:"click.bs.modal.data-api"},Qe="modal-dialog-scrollable",Ke="modal-scrollbar-measure",ze="modal-backdrop",$e="modal-open",Ve="fade",Ye="show",Xe=".modal-dialog",Ge=".modal-body",Je='[data-toggle="modal"]',Ze='[data-dismiss="modal"]',et=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",tt=".sticky-top",nt=function(){function e(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(Xe),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var n=e.prototype;return n.toggle=function(e){return this._isShown?this.hide():this.show(e)},n.show=function(e){var n=this;if(!this._isShown&&!this._isTransitioning){t(this._element).hasClass(Ve)&&(this._isTransitioning=!0);var i=t.Event(Ue.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(Ue.CLICK_DISMISS,Ze,(function(e){return n.hide(e)})),t(this._dialog).on(Ue.MOUSEDOWN_DISMISS,(function(){t(n._element).one(Ue.MOUSEUP_DISMISS,(function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return n._showElement(e)})))}},n.hide=function(e){var n=this;if(e&&e.preventDefault(),this._isShown&&!this._isTransitioning){var i=t.Event(Ue.HIDE);if(t(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var r=t(this._element).hasClass(Ve);if(r&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),t(document).off(Ue.FOCUSIN),t(this._element).removeClass(Ye),t(this._element).off(Ue.CLICK_DISMISS),t(this._dialog).off(Ue.MOUSEDOWN_DISMISS),r){var o=l.getTransitionDurationFromElement(this._element);t(this._element).one(l.TRANSITION_END,(function(e){return n._hideModal(e)})).emulateTransitionEnd(o)}else this._hideModal()}}},n.dispose=function(){[window,this._element,this._dialog].forEach((function(e){return t(e).off(".bs.modal")})),t(document).off(Ue.FOCUSIN),t.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},n.handleUpdate=function(){this._adjustDialog()},n._getConfig=function(e){return e=s({},We,e),l.typeCheckConfig("modal",e,Be),e},n._showElement=function(e){var n=this,i=t(this._element).hasClass(Ve);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),t(this._dialog).hasClass(Qe)?this._dialog.querySelector(Ge).scrollTop=0:this._element.scrollTop=0,i&&l.reflow(this._element),t(this._element).addClass(Ye),this._config.focus&&this._enforceFocus();var r=t.Event(Ue.SHOWN,{relatedTarget:e}),o=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(r)};if(i){var s=l.getTransitionDurationFromElement(this._dialog);t(this._dialog).one(l.TRANSITION_END,o).emulateTransitionEnd(s)}else o()},n._enforceFocus=function(){var e=this;t(document).off(Ue.FOCUSIN).on(Ue.FOCUSIN,(function(n){document!==n.target&&e._element!==n.target&&0===t(e._element).has(n.target).length&&e._element.focus()}))},n._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(Ue.KEYDOWN_DISMISS,(function(t){27===t.which&&(t.preventDefault(),e.hide())})):this._isShown||t(this._element).off(Ue.KEYDOWN_DISMISS)},n._setResizeEvent=function(){var e=this;this._isShown?t(window).on(Ue.RESIZE,(function(t){return e.handleUpdate(t)})):t(window).off(Ue.RESIZE)},n._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop((function(){t(document.body).removeClass($e),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(Ue.HIDDEN)}))},n._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},n._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(Ve)?Ve:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=ze,i&&this._backdrop.classList.add(i),t(this._backdrop).appendTo(document.body),t(this._element).on(Ue.CLICK_DISMISS,(function(e){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide())})),i&&l.reflow(this._backdrop),t(this._backdrop).addClass(Ye),!e)return;if(!i)return void e();var r=l.getTransitionDurationFromElement(this._backdrop);t(this._backdrop).one(l.TRANSITION_END,e).emulateTransitionEnd(r)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(Ye);var o=function(){n._removeBackdrop(),e&&e()};if(t(this._element).hasClass(Ve)){var s=l.getTransitionDurationFromElement(this._backdrop);t(this._backdrop).one(l.TRANSITION_END,o).emulateTransitionEnd(s)}else o()}else e&&e()},n._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},n._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},n._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},n._setScrollbar=function(){var e=this;if(this._isBodyOverflowing){var n=[].slice.call(document.querySelectorAll(et)),i=[].slice.call(document.querySelectorAll(tt));t(n).each((function(n,i){var r=i.style.paddingRight,o=t(i).css("padding-right");t(i).data("padding-right",r).css("padding-right",parseFloat(o)+e._scrollbarWidth+"px")})),t(i).each((function(n,i){var r=i.style.marginRight,o=t(i).css("margin-right");t(i).data("margin-right",r).css("margin-right",parseFloat(o)-e._scrollbarWidth+"px")}));var r=document.body.style.paddingRight,o=t(document.body).css("padding-right");t(document.body).data("padding-right",r).css("padding-right",parseFloat(o)+this._scrollbarWidth+"px")}t(document.body).addClass($e)},n._resetScrollbar=function(){var e=[].slice.call(document.querySelectorAll(et));t(e).each((function(e,n){var i=t(n).data("padding-right");t(n).removeData("padding-right"),n.style.paddingRight=i||""}));var n=[].slice.call(document.querySelectorAll(""+tt));t(n).each((function(e,n){var i=t(n).data("margin-right");void 0!==i&&t(n).css("margin-right",i).removeData("margin-right")}));var i=t(document.body).data("padding-right");t(document.body).removeData("padding-right"),document.body.style.paddingRight=i||""},n._getScrollbarWidth=function(){var e=document.createElement("div");e.className=Ke,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},e._jQueryInterface=function(n,i){return this.each((function(){var r=t(this).data("bs.modal"),o=s({},We,t(this).data(),"object"==typeof n&&n?n:{});if(r||(r=new e(this,o),t(this).data("bs.modal",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n](i)}else o.show&&r.show(i)}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return We}}]),e}();t(document).on(Ue.CLICK_DATA_API,Je,(function(e){var n,i=this,r=l.getSelectorFromElement(this);r&&(n=document.querySelector(r));var o=t(n).data("bs.modal")?"toggle":s({},t(n).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var a=t(n).one(Ue.SHOW,(function(e){e.isDefaultPrevented()||a.one(Ue.HIDDEN,(function(){t(i).is(":visible")&&i.focus()}))}));nt._jQueryInterface.call(t(n),o,this)})),t.fn.modal=nt._jQueryInterface,t.fn.modal.Constructor=nt,t.fn.modal.noConflict=function(){return t.fn.modal=Fe,nt._jQueryInterface};var it=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],rt={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},ot=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,st=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function at(e,t,n){if(0===e.length)return e;if(n&&"function"==typeof n)return n(e);for(var i=(new window.DOMParser).parseFromString(e,"text/html"),r=Object.keys(t),o=[].slice.call(i.body.querySelectorAll("*")),s=function(e,n){var i=o[e],s=i.nodeName.toLowerCase();if(-1===r.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var a=[].slice.call(i.attributes),l=[].concat(t["*"]||[],t[s]||[]);a.forEach((function(e){(function(e,t){var n=e.nodeName.toLowerCase();if(-1!==t.indexOf(n))return-1===it.indexOf(n)||Boolean(e.nodeValue.match(ot)||e.nodeValue.match(st));for(var i=t.filter((function(e){return e instanceof RegExp})),r=0,o=i.length;r<o;r++)if(n.match(i[r]))return!0;return!1})(e,l)||i.removeAttribute(e.nodeName)}))},a=0,l=o.length;a<l;a++)s(a);return i.body.innerHTML}var lt="tooltip",ct=t.fn[lt],ut=new RegExp("(^|\\s)bs-tooltip\\S+","g"),ft=["sanitize","whiteList","sanitizeFn"],dt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object"},ht={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},pt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:rt},gt="show",mt="out",vt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},yt="fade",bt="show",_t=".tooltip-inner",wt=".arrow",Et="hover",Ct="focus",Tt="click",xt="manual",St=function(){function e(e,t){if(void 0===n)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}var i=e.prototype;return i.enable=function(){this._isEnabled=!0},i.disable=function(){this._isEnabled=!1},i.toggleEnabled=function(){this._isEnabled=!this._isEnabled},i.toggle=function(e){if(this._isEnabled)if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(bt))return void this._leave(null,this);this._enter(null,this)}},i.dispose=function(){clearTimeout(this._timeout),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,null!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},i.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var i=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){t(this.element).trigger(i);var r=l.findShadowRoot(this.element),o=t.contains(null!==r?r:this.element.ownerDocument.documentElement,this.element);if(i.isDefaultPrevented()||!o)return;var s=this.getTipElement(),a=l.getUID(this.constructor.NAME);s.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&t(s).addClass(yt);var c="function"==typeof this.config.placement?this.config.placement.call(this,s,this.element):this.config.placement,u=this._getAttachment(c);this.addAttachmentClass(u);var f=this._getContainer();t(s).data(this.constructor.DATA_KEY,this),t.contains(this.element.ownerDocument.documentElement,this.tip)||t(s).appendTo(f),t(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new n(this.element,s,{placement:u,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:wt},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}}),t(s).addClass(bt),"ontouchstart"in document.documentElement&&t(document.body).children().on("mouseover",null,t.noop);var d=function(){e.config.animation&&e._fixTransition();var n=e._hoverState;e._hoverState=null,t(e.element).trigger(e.constructor.Event.SHOWN),n===mt&&e._leave(null,e)};if(t(this.tip).hasClass(yt)){var h=l.getTransitionDurationFromElement(this.tip);t(this.tip).one(l.TRANSITION_END,d).emulateTransitionEnd(h)}else d()}},i.hide=function(e){var n=this,i=this.getTipElement(),r=t.Event(this.constructor.Event.HIDE),o=function(){n._hoverState!==gt&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()};if(t(this.element).trigger(r),!r.isDefaultPrevented()){if(t(i).removeClass(bt),"ontouchstart"in document.documentElement&&t(document.body).children().off("mouseover",null,t.noop),this._activeTrigger[Tt]=!1,this._activeTrigger[Ct]=!1,this._activeTrigger[Et]=!1,t(this.tip).hasClass(yt)){var s=l.getTransitionDurationFromElement(i);t(i).one(l.TRANSITION_END,o).emulateTransitionEnd(s)}else o();this._hoverState=""}},i.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},i.isWithContent=function(){return Boolean(this.getTitle())},i.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-tooltip-"+e)},i.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},i.setContent=function(){var e=this.getTipElement();this.setElementContent(t(e.querySelectorAll(_t)),this.getTitle()),t(e).removeClass(yt+" "+bt)},i.setElementContent=function(e,n){"object"!=typeof n||!n.nodeType&&!n.jquery?this.config.html?(this.config.sanitize&&(n=at(n,this.config.whiteList,this.config.sanitizeFn)),e.html(n)):e.text(n):this.config.html?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text())},i.getTitle=function(){var e=this.element.getAttribute("data-original-title");return e||(e="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),e},i._getOffset=function(){var e=this,t={};return"function"==typeof this.config.offset?t.fn=function(t){return t.offsets=s({},t.offsets,e.config.offset(t.offsets,e.element)||{}),t}:t.offset=this.config.offset,t},i._getContainer=function(){return!1===this.config.container?document.body:l.isElement(this.config.container)?t(this.config.container):t(document).find(this.config.container)},i._getAttachment=function(e){return ht[e.toUpperCase()]},i._setListeners=function(){var e=this;this.config.trigger.split(" ").forEach((function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,(function(t){return e.toggle(t)}));else if(n!==xt){var i=n===Et?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,r=n===Et?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,(function(t){return e._enter(t)})).on(r,e.config.selector,(function(t){return e._leave(t)}))}})),t(this.element).closest(".modal").on("hide.bs.modal",(function(){e.element&&e.hide()})),this.config.selector?this.config=s({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},i._fixTitle=function(){var e=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==e)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},i._enter=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?Ct:Et]=!0),t(n.getTipElement()).hasClass(bt)||n._hoverState===gt?n._hoverState=gt:(clearTimeout(n._timeout),n._hoverState=gt,n.config.delay&&n.config.delay.show?n._timeout=setTimeout((function(){n._hoverState===gt&&n.show()}),n.config.delay.show):n.show())},i._leave=function(e,n){var i=this.constructor.DATA_KEY;(n=n||t(e.currentTarget).data(i))||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?Ct:Et]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState=mt,n.config.delay&&n.config.delay.hide?n._timeout=setTimeout((function(){n._hoverState===mt&&n.hide()}),n.config.delay.hide):n.hide())},i._isWithActiveTrigger=function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},i._getConfig=function(e){var n=t(this.element).data();return Object.keys(n).forEach((function(e){-1!==ft.indexOf(e)&&delete n[e]})),"number"==typeof(e=s({},this.constructor.Default,n,"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),l.typeCheckConfig(lt,e,this.constructor.DefaultType),e.sanitize&&(e.template=at(e.template,e.whiteList,e.sanitizeFn)),e},i._getDelegateConfig=function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e},i._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(ut);null!==n&&n.length&&e.removeClass(n.join(""))},i._handlePopperPlacementChange=function(e){var t=e.instance;this.tip=t.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))},i._fixTransition=function(){var e=this.getTipElement(),n=this.config.animation;null===e.getAttribute("x-placement")&&(t(e).removeClass(yt),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.tooltip"),r="object"==typeof n&&n;if((i||!/dispose|hide/.test(n))&&(i||(i=new e(this,r),t(this).data("bs.tooltip",i)),"string"==typeof n)){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return pt}},{key:"NAME",get:function(){return lt}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return vt}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return dt}}]),e}();t.fn[lt]=St._jQueryInterface,t.fn[lt].Constructor=St,t.fn[lt].noConflict=function(){return t.fn[lt]=ct,St._jQueryInterface};var Dt="popover",At=t.fn[Dt],Nt=new RegExp("(^|\\s)bs-popover\\S+","g"),kt=s({},St.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),It=s({},St.DefaultType,{content:"(string|element|function)"}),Ot="fade",Lt="show",jt=".popover-header",Pt=".popover-body",Ht={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},qt=function(e){var n,i;function o(){return e.apply(this,arguments)||this}i=e,(n=o).prototype=Object.create(i.prototype),n.prototype.constructor=n,n.__proto__=i;var s=o.prototype;return s.isWithContent=function(){return this.getTitle()||this._getContent()},s.addAttachmentClass=function(e){t(this.getTipElement()).addClass("bs-popover-"+e)},s.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0],this.tip},s.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(jt),this.getTitle());var n=this._getContent();"function"==typeof n&&(n=n.call(this.element)),this.setElementContent(e.find(Pt),n),e.removeClass(Ot+" "+Lt)},s._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},s._cleanTipClass=function(){var e=t(this.getTipElement()),n=e.attr("class").match(Nt);null!==n&&n.length>0&&e.removeClass(n.join(""))},o._jQueryInterface=function(e){return this.each((function(){var n=t(this).data("bs.popover"),i="object"==typeof e?e:null;if((n||!/dispose|hide/.test(e))&&(n||(n=new o(this,i),t(this).data("bs.popover",n)),"string"==typeof e)){if(void 0===n[e])throw new TypeError('No method named "'+e+'"');n[e]()}}))},r(o,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return kt}},{key:"NAME",get:function(){return Dt}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return Ht}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return It}}]),o}(St);t.fn[Dt]=qt._jQueryInterface,t.fn[Dt].Constructor=qt,t.fn[Dt].noConflict=function(){return t.fn[Dt]=At,qt._jQueryInterface};var Rt="scrollspy",Mt=t.fn[Rt],Ft={offset:10,method:"auto",target:""},Wt={offset:"number",method:"string",target:"(string|element)"},Bt={ACTIVATE:"activate.bs.scrollspy",SCROLL:"scroll.bs.scrollspy",LOAD_DATA_API:"load.bs.scrollspy.data-api"},Ut="dropdown-item",Qt="active",Kt='[data-spy="scroll"]',zt=".nav, .list-group",$t=".nav-link",Vt=".nav-item",Yt=".list-group-item",Xt=".dropdown",Gt=".dropdown-item",Jt=".dropdown-toggle",Zt="offset",en="position",tn=function(){function e(e,n){var i=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(n),this._selector=this._config.target+" "+$t+","+this._config.target+" "+Yt+","+this._config.target+" "+Gt,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(Bt.SCROLL,(function(e){return i._process(e)})),this.refresh(),this._process()}var n=e.prototype;return n.refresh=function(){var e=this,n=this._scrollElement===this._scrollElement.window?Zt:en,i="auto"===this._config.method?n:this._config.method,r=i===en?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(e){var n,o=l.getSelectorFromElement(e);if(o&&(n=document.querySelector(o)),n){var s=n.getBoundingClientRect();if(s.width||s.height)return[t(n)[i]().top+r,o]}return null})).filter((function(e){return e})).sort((function(e,t){return e[0]-t[0]})).forEach((function(t){e._offsets.push(t[0]),e._targets.push(t[1])}))},n.dispose=function(){t.removeData(this._element,"bs.scrollspy"),t(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},n._getConfig=function(e){if("string"!=typeof(e=s({},Ft,"object"==typeof e&&e?e:{})).target){var n=t(e.target).attr("id");n||(n=l.getUID(Rt),t(e.target).attr("id",n)),e.target="#"+n}return l.typeCheckConfig(Rt,e,Wt),e},n._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},n._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},n._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},n._process=function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),n=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),e>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&e<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var r=this._offsets.length;r--;)this._activeTarget!==this._targets[r]&&e>=this._offsets[r]&&(void 0===this._offsets[r+1]||e<this._offsets[r+1])&&this._activate(this._targets[r])}},n._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",").map((function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'})),i=t([].slice.call(document.querySelectorAll(n.join(","))));i.hasClass(Ut)?(i.closest(Xt).find(Jt).addClass(Qt),i.addClass(Qt)):(i.addClass(Qt),i.parents(zt).prev($t+", "+Yt).addClass(Qt),i.parents(zt).prev(Vt).children($t).addClass(Qt)),t(this._scrollElement).trigger(Bt.ACTIVATE,{relatedTarget:e})},n._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(e){return e.classList.contains(Qt)})).forEach((function(e){return e.classList.remove(Qt)}))},e._jQueryInterface=function(n){return this.each((function(){var i=t(this).data("bs.scrollspy");if(i||(i=new e(this,"object"==typeof n&&n),t(this).data("bs.scrollspy",i)),"string"==typeof n){if(void 0===i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Ft}}]),e}();t(window).on(Bt.LOAD_DATA_API,(function(){for(var e=[].slice.call(document.querySelectorAll(Kt)),n=e.length;n--;){var i=t(e[n]);tn._jQueryInterface.call(i,i.data())}})),t.fn[Rt]=tn._jQueryInterface,t.fn[Rt].Constructor=tn,t.fn[Rt].noConflict=function(){return t.fn[Rt]=Mt,tn._jQueryInterface};var nn=t.fn.tab,rn={HIDE:"hide.bs.tab",HIDDEN:"hidden.bs.tab",SHOW:"show.bs.tab",SHOWN:"shown.bs.tab",CLICK_DATA_API:"click.bs.tab.data-api"},on="dropdown-menu",sn="active",an="disabled",ln="fade",cn="show",un=".dropdown",fn=".nav, .list-group",dn=".active",hn="> li > .active",pn='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',gn=".dropdown-toggle",mn="> .dropdown-menu .active",vn=function(){function e(e){this._element=e}var n=e.prototype;return n.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(sn)||t(this._element).hasClass(an))){var n,i,r=t(this._element).closest(fn)[0],o=l.getSelectorFromElement(this._element);if(r){var s="UL"===r.nodeName||"OL"===r.nodeName?hn:dn;i=(i=t.makeArray(t(r).find(s)))[i.length-1]}var a=t.Event(rn.HIDE,{relatedTarget:this._element}),c=t.Event(rn.SHOW,{relatedTarget:i});if(i&&t(i).trigger(a),t(this._element).trigger(c),!c.isDefaultPrevented()&&!a.isDefaultPrevented()){o&&(n=document.querySelector(o)),this._activate(this._element,r);var u=function(){var n=t.Event(rn.HIDDEN,{relatedTarget:e._element}),r=t.Event(rn.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e._element).trigger(r)};n?this._activate(n,n.parentNode,u):u()}}},n.dispose=function(){t.removeData(this._element,"bs.tab"),this._element=null},n._activate=function(e,n,i){var r=this,o=(!n||"UL"!==n.nodeName&&"OL"!==n.nodeName?t(n).children(dn):t(n).find(hn))[0],s=i&&o&&t(o).hasClass(ln),a=function(){return r._transitionComplete(e,o,i)};if(o&&s){var c=l.getTransitionDurationFromElement(o);t(o).removeClass(cn).one(l.TRANSITION_END,a).emulateTransitionEnd(c)}else a()},n._transitionComplete=function(e,n,i){if(n){t(n).removeClass(sn);var r=t(n.parentNode).find(mn)[0];r&&t(r).removeClass(sn),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}if(t(e).addClass(sn),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),l.reflow(e),e.classList.contains(ln)&&e.classList.add(cn),e.parentNode&&t(e.parentNode).hasClass(on)){var o=t(e).closest(un)[0];if(o){var s=[].slice.call(o.querySelectorAll(gn));t(s).addClass(sn)}e.setAttribute("aria-expanded",!0)}i&&i()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.tab");if(r||(r=new e(this),i.data("bs.tab",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n]()}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),e}();t(document).on(rn.CLICK_DATA_API,pn,(function(e){e.preventDefault(),vn._jQueryInterface.call(t(this),"show")})),t.fn.tab=vn._jQueryInterface,t.fn.tab.Constructor=vn,t.fn.tab.noConflict=function(){return t.fn.tab=nn,vn._jQueryInterface};var yn=t.fn.toast,bn={CLICK_DISMISS:"click.dismiss.bs.toast",HIDE:"hide.bs.toast",HIDDEN:"hidden.bs.toast",SHOW:"show.bs.toast",SHOWN:"shown.bs.toast"},_n="fade",wn="hide",En="show",Cn="showing",Tn={animation:"boolean",autohide:"boolean",delay:"number"},xn={animation:!0,autohide:!0,delay:500},Sn='[data-dismiss="toast"]',Dn=function(){function e(e,t){this._element=e,this._config=this._getConfig(t),this._timeout=null,this._setListeners()}var n=e.prototype;return n.show=function(){var e=this;t(this._element).trigger(bn.SHOW),this._config.animation&&this._element.classList.add(_n);var n=function(){e._element.classList.remove(Cn),e._element.classList.add(En),t(e._element).trigger(bn.SHOWN),e._config.autohide&&e.hide()};if(this._element.classList.remove(wn),this._element.classList.add(Cn),this._config.animation){var i=l.getTransitionDurationFromElement(this._element);t(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(i)}else n()},n.hide=function(e){var n=this;this._element.classList.contains(En)&&(t(this._element).trigger(bn.HIDE),e?this._close():this._timeout=setTimeout((function(){n._close()}),this._config.delay))},n.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(En)&&this._element.classList.remove(En),t(this._element).off(bn.CLICK_DISMISS),t.removeData(this._element,"bs.toast"),this._element=null,this._config=null},n._getConfig=function(e){return e=s({},xn,t(this._element).data(),"object"==typeof e&&e?e:{}),l.typeCheckConfig("toast",e,this.constructor.DefaultType),e},n._setListeners=function(){var e=this;t(this._element).on(bn.CLICK_DISMISS,Sn,(function(){return e.hide(!0)}))},n._close=function(){var e=this,n=function(){e._element.classList.add(wn),t(e._element).trigger(bn.HIDDEN)};if(this._element.classList.remove(En),this._config.animation){var i=l.getTransitionDurationFromElement(this._element);t(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(i)}else n()},e._jQueryInterface=function(n){return this.each((function(){var i=t(this),r=i.data("bs.toast");if(r||(r=new e(this,"object"==typeof n&&n),i.data("bs.toast",r)),"string"==typeof n){if(void 0===r[n])throw new TypeError('No method named "'+n+'"');r[n](this)}}))},r(e,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"DefaultType",get:function(){return Tn}},{key:"Default",get:function(){return xn}}]),e}();t.fn.toast=Dn._jQueryInterface,t.fn.toast.Constructor=Dn,t.fn.toast.noConflict=function(){return t.fn.toast=yn,Dn._jQueryInterface},function(){if(void 0===t)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),e.Util=l,e.Alert=g,e.Button=S,e.Carousel=ee,e.Collapse=pe,e.Dropdown=Me,e.Modal=nt,e.Popover=qt,e.Scrollspy=tn,e.Tab=vn,e.Toast=Dn,e.Tooltip=St,Object.defineProperty(e,"__esModule",{value:!0})}(t,n(4),n(0))},function(e,t,n){var i;!function(t,n){"use strict";"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:this,(function(n,r){"use strict";var o=[],s=Object.getPrototypeOf,a=o.slice,l=o.flat?function(e){return o.flat.call(e)}:function(e){return o.concat.apply([],e)},c=o.push,u=o.indexOf,f={},d=f.toString,h=f.hasOwnProperty,p=h.toString,g=p.call(Object),m={},v=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},y=function(e){return null!=e&&e===e.window},b=n.document,_={type:!0,src:!0,nonce:!0,noModule:!0};function w(e,t,n){var i,r,o=(n=n||b).createElement("script");if(o.text=e,t)for(i in _)(r=t[i]||t.getAttribute&&t.getAttribute(i))&&o.setAttribute(i,r);n.head.appendChild(o).parentNode.removeChild(o)}function E(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?f[d.call(e)]||"object":typeof e}var C=function(e,t){return new C.fn.init(e,t)};function T(e){var t=!!e&&"length"in e&&e.length,n=E(e);return!v(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}C.fn=C.prototype={jquery:"3.5.1",constructor:C,length:0,toArray:function(){return a.call(this)},get:function(e){return null==e?a.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=C.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return C.each(this,e)},map:function(e){return this.pushStack(C.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(a.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(C.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(C.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:c,sort:o.sort,splice:o.splice},C.extend=C.fn.extend=function(){var e,t,n,i,r,o,s=arguments[0]||{},a=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||v(s)||(s={}),a===l&&(s=this,a--);a<l;a++)if(null!=(e=arguments[a]))for(t in e)i=e[t],"__proto__"!==t&&s!==i&&(c&&i&&(C.isPlainObject(i)||(r=Array.isArray(i)))?(n=s[t],o=r&&!Array.isArray(n)?[]:r||C.isPlainObject(n)?n:{},r=!1,s[t]=C.extend(c,o,i)):void 0!==i&&(s[t]=i));return s},C.extend({expando:"jQuery"+("3.5.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==d.call(e))&&(!(t=s(e))||"function"==typeof(n=h.call(t,"constructor")&&t.constructor)&&p.call(n)===g)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){w(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,i=0;if(T(e))for(n=e.length;i<n&&!1!==t.call(e[i],i,e[i]);i++);else for(i in e)if(!1===t.call(e[i],i,e[i]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(T(Object(e))?C.merge(n,"string"==typeof e?[e]:e):c.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,i=0,r=e.length;i<n;i++)e[r++]=t[i];return e.length=r,e},grep:function(e,t,n){for(var i=[],r=0,o=e.length,s=!n;r<o;r++)!t(e[r],r)!==s&&i.push(e[r]);return i},map:function(e,t,n){var i,r,o=0,s=[];if(T(e))for(i=e.length;o<i;o++)null!=(r=t(e[o],o,n))&&s.push(r);else for(o in e)null!=(r=t(e[o],o,n))&&s.push(r);return l(s)},guid:1,support:m}),"function"==typeof Symbol&&(C.fn[Symbol.iterator]=o[Symbol.iterator]),C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){f["[object "+t+"]"]=t.toLowerCase()}));var x=function(e){var t,n,i,r,o,s,a,l,c,u,f,d,h,p,g,m,v,y,b,_="sizzle"+1*new Date,w=e.document,E=0,C=0,T=le(),x=le(),S=le(),D=le(),A=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,k=[],I=k.pop,O=k.push,L=k.push,j=k.slice,P=function(e,t){for(var n=0,i=e.length;n<i;n++)if(e[n]===t)return n;return-1},H="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",q="[\\x20\\t\\r\\n\\f]",R="(?:\\\\[\\da-fA-F]{1,6}"+q+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",M="\\["+q+"*("+R+")(?:"+q+"*([*^$|!~]?=)"+q+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+q+"*\\]",F=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",W=new RegExp(q+"+","g"),B=new RegExp("^"+q+"+|((?:^|[^\\\\])(?:\\\\.)*)"+q+"+$","g"),U=new RegExp("^"+q+"*,"+q+"*"),Q=new RegExp("^"+q+"*([>+~]|"+q+")"+q+"*"),K=new RegExp(q+"|>"),z=new RegExp(F),$=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+q+"*(even|odd|(([+-]|)(\\d*)n|)"+q+"*(?:([+-]|)"+q+"*(\\d+)|))"+q+"*\\)|)","i"),bool:new RegExp("^(?:"+H+")$","i"),needsContext:new RegExp("^"+q+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+q+"*((?:-\\d)?\\d*)"+q+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,X=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,J=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+q+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},ie=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,re=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){d()},se=_e((function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()}),{dir:"parentNode",next:"legend"});try{L.apply(k=j.call(w.childNodes),w.childNodes),k[w.childNodes.length].nodeType}catch(e){L={apply:k.length?function(e,t){O.apply(e,j.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}function ae(e,t,i,r){var o,a,c,u,f,p,v,y=t&&t.ownerDocument,w=t?t.nodeType:9;if(i=i||[],"string"!=typeof e||!e||1!==w&&9!==w&&11!==w)return i;if(!r&&(d(t),t=t||h,g)){if(11!==w&&(f=Z.exec(e)))if(o=f[1]){if(9===w){if(!(c=t.getElementById(o)))return i;if(c.id===o)return i.push(c),i}else if(y&&(c=y.getElementById(o))&&b(t,c)&&c.id===o)return i.push(c),i}else{if(f[2])return L.apply(i,t.getElementsByTagName(e)),i;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(i,t.getElementsByClassName(o)),i}if(n.qsa&&!D[e+" "]&&(!m||!m.test(e))&&(1!==w||"object"!==t.nodeName.toLowerCase())){if(v=e,y=t,1===w&&(K.test(e)||Q.test(e))){for((y=ee.test(e)&&ve(t.parentNode)||t)===t&&n.scope||((u=t.getAttribute("id"))?u=u.replace(ie,re):t.setAttribute("id",u=_)),a=(p=s(e)).length;a--;)p[a]=(u?"#"+u:":scope")+" "+be(p[a]);v=p.join(",")}try{return L.apply(i,y.querySelectorAll(v)),i}catch(t){D(e,!0)}finally{u===_&&t.removeAttribute("id")}}}return l(e.replace(B,"$1"),t,i,r)}function le(){var e=[];return function t(n,r){return e.push(n+" ")>i.cacheLength&&delete t[e.shift()],t[n+" "]=r}}function ce(e){return e[_]=!0,e}function ue(e){var t=h.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){for(var n=e.split("|"),r=n.length;r--;)i.attrHandle[n[r]]=t}function de(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(i)return i;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function he(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ge(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&se(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function me(e){return ce((function(t){return t=+t,ce((function(n,i){for(var r,o=e([],n.length,t),s=o.length;s--;)n[r=o[s]]&&(n[r]=!(i[r]=n[r]))}))}))}function ve(e){return e&&void 0!==e.getElementsByTagName&&e}for(t in n=ae.support={},o=ae.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},d=ae.setDocument=function(e){var t,r,s=e?e.ownerDocument||e:w;return s!=h&&9===s.nodeType&&s.documentElement?(p=(h=s).documentElement,g=!o(h),w!=h&&(r=h.defaultView)&&r.top!==r&&(r.addEventListener?r.addEventListener("unload",oe,!1):r.attachEvent&&r.attachEvent("onunload",oe)),n.scope=ue((function(e){return p.appendChild(e).appendChild(h.createElement("div")),void 0!==e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length})),n.attributes=ue((function(e){return e.className="i",!e.getAttribute("className")})),n.getElementsByTagName=ue((function(e){return e.appendChild(h.createComment("")),!e.getElementsByTagName("*").length})),n.getElementsByClassName=J.test(h.getElementsByClassName),n.getById=ue((function(e){return p.appendChild(e).id=_,!h.getElementsByName||!h.getElementsByName(_).length})),n.getById?(i.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},i.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(i.filter.ID=function(e){var t=e.replace(te,ne);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},i.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n,i,r,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];for(r=t.getElementsByName(e),i=0;o=r[i++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),i.find.TAG=n.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,i=[],r=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[r++];)1===n.nodeType&&i.push(n);return i}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],m=[],(n.qsa=J.test(h.querySelectorAll))&&(ue((function(e){var t;p.appendChild(e).innerHTML="<a id='"+_+"'></a><select id='"+_+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&m.push("[*^$]="+q+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||m.push("\\["+q+"*(?:value|"+H+")"),e.querySelectorAll("[id~="+_+"-]").length||m.push("~="),(t=h.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||m.push("\\["+q+"*name"+q+"*="+q+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||m.push(":checked"),e.querySelectorAll("a#"+_+"+*").length||m.push(".#.+[+~]"),e.querySelectorAll("\\\f"),m.push("[\\r\\n\\f]")})),ue((function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=h.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&m.push("name"+q+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&m.push(":enabled",":disabled"),p.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&m.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),m.push(",.*:")}))),(n.matchesSelector=J.test(y=p.matches||p.webkitMatchesSelector||p.mozMatchesSelector||p.oMatchesSelector||p.msMatchesSelector))&&ue((function(e){n.disconnectedMatch=y.call(e,"*"),y.call(e,"[s!='']:x"),v.push("!=",F)})),m=m.length&&new RegExp(m.join("|")),v=v.length&&new RegExp(v.join("|")),t=J.test(p.compareDocumentPosition),b=t||J.test(p.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode;return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},A=t?function(e,t){if(e===t)return f=!0,0;var i=!e.compareDocumentPosition-!t.compareDocumentPosition;return i||(1&(i=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===i?e==h||e.ownerDocument==w&&b(w,e)?-1:t==h||t.ownerDocument==w&&b(w,t)?1:u?P(u,e)-P(u,t):0:4&i?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,i=0,r=e.parentNode,o=t.parentNode,s=[e],a=[t];if(!r||!o)return e==h?-1:t==h?1:r?-1:o?1:u?P(u,e)-P(u,t):0;if(r===o)return de(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)a.unshift(n);for(;s[i]===a[i];)i++;return i?de(s[i],a[i]):s[i]==w?-1:a[i]==w?1:0},h):h},ae.matches=function(e,t){return ae(e,null,null,t)},ae.matchesSelector=function(e,t){if(d(e),n.matchesSelector&&g&&!D[t+" "]&&(!v||!v.test(t))&&(!m||!m.test(t)))try{var i=y.call(e,t);if(i||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(e){D(t,!0)}return ae(t,h,null,[e]).length>0},ae.contains=function(e,t){return(e.ownerDocument||e)!=h&&d(e),b(e,t)},ae.attr=function(e,t){(e.ownerDocument||e)!=h&&d(e);var r=i.attrHandle[t.toLowerCase()],o=r&&N.call(i.attrHandle,t.toLowerCase())?r(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},ae.escape=function(e){return(e+"").replace(ie,re)},ae.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ae.uniqueSort=function(e){var t,i=[],r=0,o=0;if(f=!n.detectDuplicates,u=!n.sortStable&&e.slice(0),e.sort(A),f){for(;t=e[o++];)t===e[o]&&(r=i.push(o));for(;r--;)e.splice(i[r],1)}return u=null,e},r=ae.getText=function(e){var t,n="",i=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=r(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[i++];)n+=r(t);return n},(i=ae.selectors={cacheLength:50,createPseudo:ce,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ae.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ae.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&z.test(n)&&(t=s(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=T[e+" "];return t||(t=new RegExp("(^|"+q+")"+e+"("+q+"|$)"))&&T(e,(function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(i){var r=ae.attr(i,e);return null==r?"!="===t:!t||(r+="","="===t?r===n:"!="===t?r!==n:"^="===t?n&&0===r.indexOf(n):"*="===t?n&&r.indexOf(n)>-1:"$="===t?n&&r.slice(-n.length)===n:"~="===t?(" "+r.replace(W," ")+" ").indexOf(n)>-1:"|="===t&&(r===n||r.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,i,r){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===i&&0===r?function(e){return!!e.parentNode}:function(t,n,l){var c,u,f,d,h,p,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),y=!l&&!a,b=!1;if(m){if(o){for(;g;){for(d=t;d=d[g];)if(a?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;p=g="only"===e&&!p&&"nextSibling"}return!0}if(p=[s?m.firstChild:m.lastChild],s&&y){for(b=(h=(c=(u=(f=(d=m)[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===E&&c[1])&&c[2],d=h&&m.childNodes[h];d=++h&&d&&d[g]||(b=h=0)||p.pop();)if(1===d.nodeType&&++b&&d===t){u[e]=[E,h,b];break}}else if(y&&(b=h=(c=(u=(f=(d=t)[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===E&&c[1]),!1===b)for(;(d=++h&&d&&d[g]||(b=h=0)||p.pop())&&((a?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++b||(y&&((u=(f=d[_]||(d[_]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]=[E,b]),d!==t)););return(b-=r)===i||b%i==0&&b/i>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ae.error("unsupported pseudo: "+e);return r[_]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ce((function(e,n){for(var i,o=r(e,t),s=o.length;s--;)e[i=P(e,o[s])]=!(n[i]=o[s])})):function(e){return r(e,0,n)}):r}},pseudos:{not:ce((function(e){var t=[],n=[],i=a(e.replace(B,"$1"));return i[_]?ce((function(e,t,n,r){for(var o,s=i(e,null,r,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))})):function(e,r,o){return t[0]=e,i(t,null,o,n),t[0]=null,!n.pop()}})),has:ce((function(e){return function(t){return ae(e,t).length>0}})),contains:ce((function(e){return e=e.replace(te,ne),function(t){return(t.textContent||r(t)).indexOf(e)>-1}})),lang:ce((function(e){return $.test(e||"")||ae.error("unsupported lang: "+e),e=e.replace(te,ne).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===p},focus:function(e){return e===h.activeElement&&(!h.hasFocus||h.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return G.test(e.nodeName)},input:function(e){return X.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:me((function(){return[0]})),last:me((function(e,t){return[t-1]})),eq:me((function(e,t,n){return[n<0?n+t:n]})),even:me((function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e})),odd:me((function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e})),lt:me((function(e,t,n){for(var i=n<0?n+t:n>t?t:n;--i>=0;)e.push(i);return e})),gt:me((function(e,t,n){for(var i=n<0?n+t:n;++i<t;)e.push(i);return e}))}}).pseudos.nth=i.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=he(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=pe(t);function ye(){}function be(e){for(var t=0,n=e.length,i="";t<n;t++)i+=e[t].value;return i}function _e(e,t,n){var i=t.dir,r=t.next,o=r||i,s=n&&"parentNode"===o,a=C++;return t.first?function(t,n,r){for(;t=t[i];)if(1===t.nodeType||s)return e(t,n,r);return!1}:function(t,n,l){var c,u,f,d=[E,a];if(l){for(;t=t[i];)if((1===t.nodeType||s)&&e(t,n,l))return!0}else for(;t=t[i];)if(1===t.nodeType||s)if(u=(f=t[_]||(t[_]={}))[t.uniqueID]||(f[t.uniqueID]={}),r&&r===t.nodeName.toLowerCase())t=t[i]||t;else{if((c=u[o])&&c[0]===E&&c[1]===a)return d[2]=c[2];if(u[o]=d,d[2]=e(t,n,l))return!0}return!1}}function we(e){return e.length>1?function(t,n,i){for(var r=e.length;r--;)if(!e[r](t,n,i))return!1;return!0}:e[0]}function Ee(e,t,n,i,r){for(var o,s=[],a=0,l=e.length,c=null!=t;a<l;a++)(o=e[a])&&(n&&!n(o,i,r)||(s.push(o),c&&t.push(a)));return s}function Ce(e,t,n,i,r,o){return i&&!i[_]&&(i=Ce(i)),r&&!r[_]&&(r=Ce(r,o)),ce((function(o,s,a,l){var c,u,f,d=[],h=[],p=s.length,g=o||function(e,t,n){for(var i=0,r=t.length;i<r;i++)ae(e,t[i],n);return n}(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:Ee(g,d,e,a,l),v=n?r||(o?e:p||i)?[]:s:m;if(n&&n(m,v,a,l),i)for(c=Ee(v,h),i(c,[],a,l),u=c.length;u--;)(f=c[u])&&(v[h[u]]=!(m[h[u]]=f));if(o){if(r||e){if(r){for(c=[],u=v.length;u--;)(f=v[u])&&c.push(m[u]=f);r(null,v=[],c,l)}for(u=v.length;u--;)(f=v[u])&&(c=r?P(o,f):d[u])>-1&&(o[c]=!(s[c]=f))}}else v=Ee(v===s?v.splice(p,v.length):v),r?r(null,s,v,l):L.apply(s,v)}))}function Te(e){for(var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,u=_e((function(e){return e===t}),a,!0),f=_e((function(e){return P(t,e)>-1}),a,!0),d=[function(e,n,i){var r=!s&&(i||n!==c)||((t=n).nodeType?u(e,n,i):f(e,n,i));return t=null,r}];l<o;l++)if(n=i.relative[e[l].type])d=[_e(we(d),n)];else{if((n=i.filter[e[l].type].apply(null,e[l].matches))[_]){for(r=++l;r<o&&!i.relative[e[r].type];r++);return Ce(l>1&&we(d),l>1&&be(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(B,"$1"),n,l<r&&Te(e.slice(l,r)),r<o&&Te(e=e.slice(r)),r<o&&be(e))}d.push(n)}return we(d)}return ye.prototype=i.filters=i.pseudos,i.setFilters=new ye,s=ae.tokenize=function(e,t){var n,r,o,s,a,l,c,u=x[e+" "];if(u)return t?0:u.slice(0);for(a=e,l=[],c=i.preFilter;a;){for(s in n&&!(r=U.exec(a))||(r&&(a=a.slice(r[0].length)||a),l.push(o=[])),n=!1,(r=Q.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),i.filter)!(r=V[s].exec(a))||c[s]&&!(r=c[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ae.error(e):x(e,l).slice(0)},a=ae.compile=function(e,t){var n,r=[],o=[],a=S[e+" "];if(!a){for(t||(t=s(e)),n=t.length;n--;)(a=Te(t[n]))[_]?r.push(a):o.push(a);(a=S(e,function(e,t){var n=t.length>0,r=e.length>0,o=function(o,s,a,l,u){var f,p,m,v=0,y="0",b=o&&[],_=[],w=c,C=o||r&&i.find.TAG("*",u),T=E+=null==w?1:Math.random()||.1,x=C.length;for(u&&(c=s==h||s||u);y!==x&&null!=(f=C[y]);y++){if(r&&f){for(p=0,s||f.ownerDocument==h||(d(f),a=!g);m=e[p++];)if(m(f,s||h,a)){l.push(f);break}u&&(E=T)}n&&((f=!m&&f)&&v--,o&&b.push(f))}if(v+=y,n&&y!==v){for(p=0;m=t[p++];)m(b,_,s,a);if(o){if(v>0)for(;y--;)b[y]||_[y]||(_[y]=I.call(l));_=Ee(_)}L.apply(l,_),u&&!o&&_.length>0&&v+t.length>1&&ae.uniqueSort(l)}return u&&(E=T,c=w),b};return n?ce(o):o}(o,r))).selector=e}return a},l=ae.select=function(e,t,n,r){var o,l,c,u,f,d="function"==typeof e&&e,h=!r&&s(e=d.selector||e);if(n=n||[],1===h.length){if((l=h[0]=h[0].slice(0)).length>2&&"ID"===(c=l[0]).type&&9===t.nodeType&&g&&i.relative[l[1].type]){if(!(t=(i.find.ID(c.matches[0].replace(te,ne),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(l.shift().value.length)}for(o=V.needsContext.test(e)?0:l.length;o--&&(c=l[o],!i.relative[u=c.type]);)if((f=i.find[u])&&(r=f(c.matches[0].replace(te,ne),ee.test(l[0].type)&&ve(t.parentNode)||t))){if(l.splice(o,1),!(e=r.length&&be(l)))return L.apply(n,r),n;break}}return(d||a(e,h))(r,t,!g,n,!t||ee.test(e)&&ve(t.parentNode)||t),n},n.sortStable=_.split("").sort(A).join("")===_,n.detectDuplicates=!!f,d(),n.sortDetached=ue((function(e){return 1&e.compareDocumentPosition(h.createElement("fieldset"))})),ue((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||fe("type|href|height|width",(function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),n.attributes&&ue((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||fe("value",(function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue})),ue((function(e){return null==e.getAttribute("disabled")}))||fe(H,(function(e,t,n){var i;if(!n)return!0===e[t]?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null})),ae}(n);C.find=x,C.expr=x.selectors,C.expr[":"]=C.expr.pseudos,C.uniqueSort=C.unique=x.uniqueSort,C.text=x.getText,C.isXMLDoc=x.isXML,C.contains=x.contains,C.escapeSelector=x.escape;var S=function(e,t,n){for(var i=[],r=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(r&&C(e).is(n))break;i.push(e)}return i},D=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},A=C.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var k=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function I(e,t,n){return v(t)?C.grep(e,(function(e,i){return!!t.call(e,i,e)!==n})):t.nodeType?C.grep(e,(function(e){return e===t!==n})):"string"!=typeof t?C.grep(e,(function(e){return u.call(t,e)>-1!==n})):C.filter(t,e,n)}C.filter=function(e,t,n){var i=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?C.find.matchesSelector(i,e)?[i]:[]:C.find.matches(e,C.grep(t,(function(e){return 1===e.nodeType})))},C.fn.extend({find:function(e){var t,n,i=this.length,r=this;if("string"!=typeof e)return this.pushStack(C(e).filter((function(){for(t=0;t<i;t++)if(C.contains(r[t],this))return!0})));for(n=this.pushStack([]),t=0;t<i;t++)C.find(e,r[t],n);return i>1?C.uniqueSort(n):n},filter:function(e){return this.pushStack(I(this,e||[],!1))},not:function(e){return this.pushStack(I(this,e||[],!0))},is:function(e){return!!I(this,"string"==typeof e&&A.test(e)?C(e):e||[],!1).length}});var O,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(C.fn.init=function(e,t,n){var i,r;if(!e)return this;if(n=n||O,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof C?t[0]:t,C.merge(this,C.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:b,!0)),k.test(i[1])&&C.isPlainObject(t))for(i in t)v(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(r=b.getElementById(i[2]))&&(this[0]=r,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):v(e)?void 0!==n.ready?n.ready(e):e(C):C.makeArray(e,this)}).prototype=C.fn,O=C(b);var j=/^(?:parents|prev(?:Until|All))/,P={children:!0,contents:!0,next:!0,prev:!0};function H(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}C.fn.extend({has:function(e){var t=C(e,this),n=t.length;return this.filter((function(){for(var e=0;e<n;e++)if(C.contains(this,t[e]))return!0}))},closest:function(e,t){var n,i=0,r=this.length,o=[],s="string"!=typeof e&&C(e);if(!A.test(e))for(;i<r;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&C.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?C.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(C(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(C.uniqueSort(C.merge(this.get(),C(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),C.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return S(e,"parentNode")},parentsUntil:function(e,t,n){return S(e,"parentNode",n)},next:function(e){return H(e,"nextSibling")},prev:function(e){return H(e,"previousSibling")},nextAll:function(e){return S(e,"nextSibling")},prevAll:function(e){return S(e,"previousSibling")},nextUntil:function(e,t,n){return S(e,"nextSibling",n)},prevUntil:function(e,t,n){return S(e,"previousSibling",n)},siblings:function(e){return D((e.parentNode||{}).firstChild,e)},children:function(e){return D(e.firstChild)},contents:function(e){return null!=e.contentDocument&&s(e.contentDocument)?e.contentDocument:(N(e,"template")&&(e=e.content||e),C.merge([],e.childNodes))}},(function(e,t){C.fn[e]=function(n,i){var r=C.map(this,t,n);return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(r=C.filter(i,r)),this.length>1&&(P[e]||C.uniqueSort(r),j.test(e)&&r.reverse()),this.pushStack(r)}}));var q=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function F(e,t,n,i){var r;try{e&&v(r=e.promise)?r.call(e).done(t).fail(n):e&&v(r=e.then)?r.call(e,t,n):t.apply(void 0,[e].slice(i))}catch(e){n.apply(void 0,[e])}}C.Callbacks=function(e){e="string"==typeof e?function(e){var t={};return C.each(e.match(q)||[],(function(e,n){t[n]=!0})),t}(e):C.extend({},e);var t,n,i,r,o=[],s=[],a=-1,l=function(){for(r=r||e.once,i=t=!0;s.length;a=-1)for(n=s.shift();++a<o.length;)!1===o[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=o.length,n=!1);e.memory||(n=!1),t=!1,r&&(o=n?[]:"")},c={add:function(){return o&&(n&&!t&&(a=o.length-1,s.push(n)),function t(n){C.each(n,(function(n,i){v(i)?e.unique&&c.has(i)||o.push(i):i&&i.length&&"string"!==E(i)&&t(i)}))}(arguments),n&&!t&&l()),this},remove:function(){return C.each(arguments,(function(e,t){for(var n;(n=C.inArray(t,o,n))>-1;)o.splice(n,1),n<=a&&a--})),this},has:function(e){return e?C.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return r=s=[],o=n="",this},disabled:function(){return!o},lock:function(){return r=s=[],n||t||(o=n=""),this},locked:function(){return!!r},fireWith:function(e,n){return r||(n=[e,(n=n||[]).slice?n.slice():n],s.push(n),t||l()),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},C.extend({Deferred:function(e){var t=[["notify","progress",C.Callbacks("memory"),C.Callbacks("memory"),2],["resolve","done",C.Callbacks("once memory"),C.Callbacks("once memory"),0,"resolved"],["reject","fail",C.Callbacks("once memory"),C.Callbacks("once memory"),1,"rejected"]],i="pending",r={state:function(){return i},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return r.then(null,e)},pipe:function(){var e=arguments;return C.Deferred((function(n){C.each(t,(function(t,i){var r=v(e[i[4]])&&e[i[4]];o[i[1]]((function(){var e=r&&r.apply(this,arguments);e&&v(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[i[0]+"With"](this,r?[e]:arguments)}))})),e=null})).promise()},then:function(e,i,r){var o=0;function s(e,t,i,r){return function(){var a=this,l=arguments,c=function(){var n,c;if(!(e<o)){if((n=i.apply(a,l))===t.promise())throw new TypeError("Thenable self-resolution");c=n&&("object"==typeof n||"function"==typeof n)&&n.then,v(c)?r?c.call(n,s(o,t,R,r),s(o,t,M,r)):(o++,c.call(n,s(o,t,R,r),s(o,t,M,r),s(o,t,R,t.notifyWith))):(i!==R&&(a=void 0,l=[n]),(r||t.resolveWith)(a,l))}},u=r?c:function(){try{c()}catch(n){C.Deferred.exceptionHook&&C.Deferred.exceptionHook(n,u.stackTrace),e+1>=o&&(i!==M&&(a=void 0,l=[n]),t.rejectWith(a,l))}};e?u():(C.Deferred.getStackHook&&(u.stackTrace=C.Deferred.getStackHook()),n.setTimeout(u))}}return C.Deferred((function(n){t[0][3].add(s(0,n,v(r)?r:R,n.notifyWith)),t[1][3].add(s(0,n,v(e)?e:R)),t[2][3].add(s(0,n,v(i)?i:M))})).promise()},promise:function(e){return null!=e?C.extend(e,r):r}},o={};return C.each(t,(function(e,n){var s=n[2],a=n[5];r[n[1]]=s.add,a&&s.add((function(){i=a}),t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),s.add(n[3].fire),o[n[0]]=function(){return o[n[0]+"With"](this===o?void 0:this,arguments),this},o[n[0]+"With"]=s.fireWith})),r.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,i=Array(n),r=a.call(arguments),o=C.Deferred(),s=function(e){return function(n){i[e]=this,r[e]=arguments.length>1?a.call(arguments):n,--t||o.resolveWith(i,r)}};if(t<=1&&(F(e,o.done(s(n)).resolve,o.reject,!t),"pending"===o.state()||v(r[n]&&r[n].then)))return o.then();for(;n--;)F(r[n],s(n),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;C.Deferred.exceptionHook=function(e,t){n.console&&n.console.warn&&e&&W.test(e.name)&&n.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},C.readyException=function(e){n.setTimeout((function(){throw e}))};var B=C.Deferred();function U(){b.removeEventListener("DOMContentLoaded",U),n.removeEventListener("load",U),C.ready()}C.fn.ready=function(e){return B.then(e).catch((function(e){C.readyException(e)})),this},C.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--C.readyWait:C.isReady)||(C.isReady=!0,!0!==e&&--C.readyWait>0||B.resolveWith(b,[C]))}}),C.ready.then=B.then,"complete"===b.readyState||"loading"!==b.readyState&&!b.documentElement.doScroll?n.setTimeout(C.ready):(b.addEventListener("DOMContentLoaded",U),n.addEventListener("load",U));var Q=function(e,t,n,i,r,o,s){var a=0,l=e.length,c=null==n;if("object"===E(n))for(a in r=!0,n)Q(e,t,a,n[a],!0,o,s);else if(void 0!==i&&(r=!0,v(i)||(s=!0),c&&(s?(t.call(e,i),t=null):(c=t,t=function(e,t,n){return c.call(C(e),n)})),t))for(;a<l;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)));return r?e:c?t.call(e):l?t(e[0],n):o},K=/^-ms-/,z=/-([a-z])/g;function $(e,t){return t.toUpperCase()}function V(e){return e.replace(K,"ms-").replace(z,$)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function X(){this.expando=C.expando+X.uid++}X.uid=1,X.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var i,r=this.cache(e);if("string"==typeof t)r[V(t)]=n;else for(i in t)r[V(i)]=t[i];return r},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i=e[this.expando];if(void 0!==i){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in i?[t]:t.match(q)||[]).length;for(;n--;)delete i[t[n]]}(void 0===t||C.isEmptyObject(i))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!C.isEmptyObject(t)}};var G=new X,J=new X,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e,t,n){var i;if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(i))){try{n=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}(n)}catch(e){}J.set(e,t,n)}else n=void 0;return n}C.extend({hasData:function(e){return J.hasData(e)||G.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return G.access(e,t,n)},_removeData:function(e,t){G.remove(e,t)}}),C.fn.extend({data:function(e,t){var n,i,r,o=this[0],s=o&&o.attributes;if(void 0===e){if(this.length&&(r=J.get(o),1===o.nodeType&&!G.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&0===(i=s[n].name).indexOf("data-")&&(i=V(i.slice(5)),te(o,i,r[i]));G.set(o,"hasDataAttrs",!0)}return r}return"object"==typeof e?this.each((function(){J.set(this,e)})):Q(this,(function(t){var n;if(o&&void 0===t)return void 0!==(n=J.get(o,e))||void 0!==(n=te(o,e))?n:void 0;this.each((function(){J.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){J.remove(this,e)}))}}),C.extend({queue:function(e,t,n){var i;if(e)return t=(t||"fx")+"queue",i=G.get(e,t),n&&(!i||Array.isArray(n)?i=G.access(e,t,C.makeArray(n)):i.push(n)),i||[]},dequeue:function(e,t){t=t||"fx";var n=C.queue(e,t),i=n.length,r=n.shift(),o=C._queueHooks(e,t);"inprogress"===r&&(r=n.shift(),i--),r&&("fx"===t&&n.unshift("inprogress"),delete o.stop,r.call(e,(function(){C.dequeue(e,t)}),o)),!i&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return G.get(e,n)||G.access(e,n,{empty:C.Callbacks("once memory").add((function(){G.remove(e,[t+"queue",n])}))})}}),C.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?C.queue(this[0],e):void 0===t?this:this.each((function(){var n=C.queue(this,e,t);C._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&C.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){C.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,r=C.Deferred(),o=this,s=this.length,a=function(){--i||r.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=G.get(o[s],e+"queueHooks"))&&n.empty&&(i++,n.empty.add(a));return a(),r.promise(t)}});var ne=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+ne+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],oe=b.documentElement,se=function(e){return C.contains(e.ownerDocument,e)},ae={composed:!0};oe.getRootNode&&(se=function(e){return C.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var le=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&se(e)&&"none"===C.css(e,"display")};function ce(e,t,n,i){var r,o,s=20,a=i?function(){return i.cur()}:function(){return C.css(e,t,"")},l=a(),c=n&&n[3]||(C.cssNumber[t]?"":"px"),u=e.nodeType&&(C.cssNumber[t]||"px"!==c&&+l)&&ie.exec(C.css(e,t));if(u&&u[3]!==c){for(l/=2,c=c||u[3],u=+l||1;s--;)C.style(e,t,u+c),(1-o)*(1-(o=a()/l||.5))<=0&&(s=0),u/=o;u*=2,C.style(e,t,u+c),n=n||[]}return n&&(u=+u||+l||0,r=n[1]?u+(n[1]+1)*n[2]:+n[2],i&&(i.unit=c,i.start=u,i.end=r)),r}var ue={};function fe(e){var t,n=e.ownerDocument,i=e.nodeName,r=ue[i];return r||(t=n.body.appendChild(n.createElement(i)),r=C.css(t,"display"),t.parentNode.removeChild(t),"none"===r&&(r="block"),ue[i]=r,r)}function de(e,t){for(var n,i,r=[],o=0,s=e.length;o<s;o++)(i=e[o]).style&&(n=i.style.display,t?("none"===n&&(r[o]=G.get(i,"display")||null,r[o]||(i.style.display="")),""===i.style.display&&le(i)&&(r[o]=fe(i))):"none"!==n&&(r[o]="none",G.set(i,"display",n)));for(o=0;o<s;o++)null!=r[o]&&(e[o].style.display=r[o]);return e}C.fn.extend({show:function(){return de(this,!0)},hide:function(){return de(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){le(this)?C(this).show():C(this).hide()}))}});var he,pe,ge=/^(?:checkbox|radio)$/i,me=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,ve=/^$|^module$|\/(?:java|ecma)script/i;he=b.createDocumentFragment().appendChild(b.createElement("div")),(pe=b.createElement("input")).setAttribute("type","radio"),pe.setAttribute("checked","checked"),pe.setAttribute("name","t"),he.appendChild(pe),m.checkClone=he.cloneNode(!0).cloneNode(!0).lastChild.checked,he.innerHTML="<textarea>x</textarea>",m.noCloneChecked=!!he.cloneNode(!0).lastChild.defaultValue,he.innerHTML="<option></option>",m.option=!!he.lastChild;var ye={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function be(e,t){var n;return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?C.merge([e],n):n}function _e(e,t){for(var n=0,i=e.length;n<i;n++)G.set(e[n],"globalEval",!t||G.get(t[n],"globalEval"))}ye.tbody=ye.tfoot=ye.colgroup=ye.caption=ye.thead,ye.th=ye.td,m.option||(ye.optgroup=ye.option=[1,"<select multiple='multiple'>","</select>"]);var we=/<|&#?\w+;/;function Ee(e,t,n,i,r){for(var o,s,a,l,c,u,f=t.createDocumentFragment(),d=[],h=0,p=e.length;h<p;h++)if((o=e[h])||0===o)if("object"===E(o))C.merge(d,o.nodeType?[o]:o);else if(we.test(o)){for(s=s||f.appendChild(t.createElement("div")),a=(me.exec(o)||["",""])[1].toLowerCase(),l=ye[a]||ye._default,s.innerHTML=l[1]+C.htmlPrefilter(o)+l[2],u=l[0];u--;)s=s.lastChild;C.merge(d,s.childNodes),(s=f.firstChild).textContent=""}else d.push(t.createTextNode(o));for(f.textContent="",h=0;o=d[h++];)if(i&&C.inArray(o,i)>-1)r&&r.push(o);else if(c=se(o),s=be(f.appendChild(o),"script"),c&&_e(s),n)for(u=0;o=s[u++];)ve.test(o.type||"")&&n.push(o);return f}var Ce=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,xe=/^([^.]*)(?:\.(.+)|)/;function Se(){return!0}function De(){return!1}function Ae(e,t){return e===function(){try{return b.activeElement}catch(e){}}()==("focus"===t)}function Ne(e,t,n,i,r,o){var s,a;if("object"==typeof t){for(a in"string"!=typeof n&&(i=i||n,n=void 0),t)Ne(e,a,n,i,t[a],o);return e}if(null==i&&null==r?(r=n,i=n=void 0):null==r&&("string"==typeof n?(r=i,i=void 0):(r=i,i=n,n=void 0)),!1===r)r=De;else if(!r)return e;return 1===o&&(s=r,(r=function(e){return C().off(e),s.apply(this,arguments)}).guid=s.guid||(s.guid=C.guid++)),e.each((function(){C.event.add(this,t,r,i,n)}))}function ke(e,t,n){n?(G.set(e,t,!1),C.event.add(e,t,{namespace:!1,handler:function(e){var i,r,o=G.get(this,t);if(1&e.isTrigger&&this[t]){if(o.length)(C.event.special[t]||{}).delegateType&&e.stopPropagation();else if(o=a.call(arguments),G.set(this,t,o),i=n(this,t),this[t](),o!==(r=G.get(this,t))||i?G.set(this,t,!1):r={},o!==r)return e.stopImmediatePropagation(),e.preventDefault(),r.value}else o.length&&(G.set(this,t,{value:C.event.trigger(C.extend(o[0],C.Event.prototype),o.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===G.get(e,t)&&C.event.add(e,t,Se)}C.event={global:{},add:function(e,t,n,i,r){var o,s,a,l,c,u,f,d,h,p,g,m=G.get(e);if(Y(e))for(n.handler&&(n=(o=n).handler,r=o.selector),r&&C.find.matchesSelector(oe,r),n.guid||(n.guid=C.guid++),(l=m.events)||(l=m.events=Object.create(null)),(s=m.handle)||(s=m.handle=function(t){return void 0!==C&&C.event.triggered!==t.type?C.event.dispatch.apply(e,arguments):void 0}),c=(t=(t||"").match(q)||[""]).length;c--;)h=g=(a=xe.exec(t[c])||[])[1],p=(a[2]||"").split(".").sort(),h&&(f=C.event.special[h]||{},h=(r?f.delegateType:f.bindType)||h,f=C.event.special[h]||{},u=C.extend({type:h,origType:g,data:i,handler:n,guid:n.guid,selector:r,needsContext:r&&C.expr.match.needsContext.test(r),namespace:p.join(".")},o),(d=l[h])||((d=l[h]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,i,p,s)||e.addEventListener&&e.addEventListener(h,s)),f.add&&(f.add.call(e,u),u.handler.guid||(u.handler.guid=n.guid)),r?d.splice(d.delegateCount++,0,u):d.push(u),C.event.global[h]=!0)},remove:function(e,t,n,i,r){var o,s,a,l,c,u,f,d,h,p,g,m=G.hasData(e)&&G.get(e);if(m&&(l=m.events)){for(c=(t=(t||"").match(q)||[""]).length;c--;)if(h=g=(a=xe.exec(t[c])||[])[1],p=(a[2]||"").split(".").sort(),h){for(f=C.event.special[h]||{},d=l[h=(i?f.delegateType:f.bindType)||h]||[],a=a[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=d.length;o--;)u=d[o],!r&&g!==u.origType||n&&n.guid!==u.guid||a&&!a.test(u.namespace)||i&&i!==u.selector&&("**"!==i||!u.selector)||(d.splice(o,1),u.selector&&d.delegateCount--,f.remove&&f.remove.call(e,u));s&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,p,m.handle)||C.removeEvent(e,h,m.handle),delete l[h])}else for(h in l)C.event.remove(e,h+t[c],n,i,!0);C.isEmptyObject(l)&&G.remove(e,"handle events")}},dispatch:function(e){var t,n,i,r,o,s,a=new Array(arguments.length),l=C.event.fix(e),c=(G.get(this,"events")||Object.create(null))[l.type]||[],u=C.event.special[l.type]||{};for(a[0]=l,t=1;t<arguments.length;t++)a[t]=arguments[t];if(l.delegateTarget=this,!u.preDispatch||!1!==u.preDispatch.call(this,l)){for(s=C.event.handlers.call(this,l,c),t=0;(r=s[t++])&&!l.isPropagationStopped();)for(l.currentTarget=r.elem,n=0;(o=r.handlers[n++])&&!l.isImmediatePropagationStopped();)l.rnamespace&&!1!==o.namespace&&!l.rnamespace.test(o.namespace)||(l.handleObj=o,l.data=o.data,void 0!==(i=((C.event.special[o.origType]||{}).handle||o.handler).apply(r.elem,a))&&!1===(l.result=i)&&(l.preventDefault(),l.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,l),l.result}},handlers:function(e,t){var n,i,r,o,s,a=[],l=t.delegateCount,c=e.target;if(l&&c.nodeType&&!("click"===e.type&&e.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==e.type||!0!==c.disabled)){for(o=[],s={},n=0;n<l;n++)void 0===s[r=(i=t[n]).selector+" "]&&(s[r]=i.needsContext?C(r,this).index(c)>-1:C.find(r,this,null,[c]).length),s[r]&&o.push(i);o.length&&a.push({elem:c,handlers:o})}return c=this,l<t.length&&a.push({elem:c,handlers:t.slice(l)}),a},addProp:function(e,t){Object.defineProperty(C.Event.prototype,e,{enumerable:!0,configurable:!0,get:v(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[C.expando]?e:new C.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return ge.test(t.type)&&t.click&&N(t,"input")&&ke(t,"click",Se),!1},trigger:function(e){var t=this||e;return ge.test(t.type)&&t.click&&N(t,"input")&&ke(t,"click"),!0},_default:function(e){var t=e.target;return ge.test(t.type)&&t.click&&N(t,"input")&&G.get(t,"click")||N(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},C.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},C.Event=function(e,t){if(!(this instanceof C.Event))return new C.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Se:De,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&C.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[C.expando]=!0},C.Event.prototype={constructor:C.Event,isDefaultPrevented:De,isPropagationStopped:De,isImmediatePropagationStopped:De,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Se,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Se,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Se,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},C.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Ce.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},C.event.addProp),C.each({focus:"focusin",blur:"focusout"},(function(e,t){C.event.special[e]={setup:function(){return ke(this,e,Ae),!1},trigger:function(){return ke(this,e),!0},delegateType:t}})),C.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){C.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,r=e.relatedTarget,o=e.handleObj;return r&&(r===i||C.contains(i,r))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}})),C.fn.extend({on:function(e,t,n,i){return Ne(this,e,t,n,i)},one:function(e,t,n,i){return Ne(this,e,t,n,i,1)},off:function(e,t,n){var i,r;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,C(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(r in e)this.off(r,t,e[r]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=De),this.each((function(){C.event.remove(this,e,n,t)}))}});var Ie=/<script|<style|<link/i,Oe=/checked\s*(?:[^=]|=\s*.checked.)/i,Le=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function je(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")&&C(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function He(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function qe(e,t){var n,i,r,o,s,a;if(1===t.nodeType){if(G.hasData(e)&&(a=G.get(e).events))for(r in G.remove(t,"handle events"),a)for(n=0,i=a[r].length;n<i;n++)C.event.add(t,r,a[r][n]);J.hasData(e)&&(o=J.access(e),s=C.extend({},o),J.set(t,s))}}function Re(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ge.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Me(e,t,n,i){t=l(t);var r,o,s,a,c,u,f=0,d=e.length,h=d-1,p=t[0],g=v(p);if(g||d>1&&"string"==typeof p&&!m.checkClone&&Oe.test(p))return e.each((function(r){var o=e.eq(r);g&&(t[0]=p.call(this,r,o.html())),Me(o,t,n,i)}));if(d&&(o=(r=Ee(t,e[0].ownerDocument,!1,e,i)).firstChild,1===r.childNodes.length&&(r=o),o||i)){for(a=(s=C.map(be(r,"script"),Pe)).length;f<d;f++)c=r,f!==h&&(c=C.clone(c,!0,!0),a&&C.merge(s,be(c,"script"))),n.call(e[f],c,f);if(a)for(u=s[s.length-1].ownerDocument,C.map(s,He),f=0;f<a;f++)c=s[f],ve.test(c.type||"")&&!G.access(c,"globalEval")&&C.contains(u,c)&&(c.src&&"module"!==(c.type||"").toLowerCase()?C._evalUrl&&!c.noModule&&C._evalUrl(c.src,{nonce:c.nonce||c.getAttribute("nonce")},u):w(c.textContent.replace(Le,""),c,u))}return e}function Fe(e,t,n){for(var i,r=t?C.filter(t,e):e,o=0;null!=(i=r[o]);o++)n||1!==i.nodeType||C.cleanData(be(i)),i.parentNode&&(n&&se(i)&&_e(be(i,"script")),i.parentNode.removeChild(i));return e}C.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var i,r,o,s,a=e.cloneNode(!0),l=se(e);if(!(m.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||C.isXMLDoc(e)))for(s=be(a),i=0,r=(o=be(e)).length;i<r;i++)Re(o[i],s[i]);if(t)if(n)for(o=o||be(e),s=s||be(a),i=0,r=o.length;i<r;i++)qe(o[i],s[i]);else qe(e,a);return(s=be(a,"script")).length>0&&_e(s,!l&&be(e,"script")),a},cleanData:function(e){for(var t,n,i,r=C.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[G.expando]){if(t.events)for(i in t.events)r[i]?C.event.remove(n,i):C.removeEvent(n,i,t.handle);n[G.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),C.fn.extend({detach:function(e){return Fe(this,e,!0)},remove:function(e){return Fe(this,e)},text:function(e){return Q(this,(function(e){return void 0===e?C.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return Me(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||je(this,e).appendChild(e)}))},prepend:function(){return Me(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=je(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return Me(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return Me(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(C.cleanData(be(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return C.clone(this,e,t)}))},html:function(e){return Q(this,(function(e){var t=this[0]||{},n=0,i=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ie.test(e)&&!ye[(me.exec(e)||["",""])[1].toLowerCase()]){e=C.htmlPrefilter(e);try{for(;n<i;n++)1===(t=this[n]||{}).nodeType&&(C.cleanData(be(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[];return Me(this,arguments,(function(t){var n=this.parentNode;C.inArray(this,e)<0&&(C.cleanData(be(this)),n&&n.replaceChild(t,this))}),e)}}),C.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){C.fn[e]=function(e){for(var n,i=[],r=C(e),o=r.length-1,s=0;s<=o;s++)n=s===o?this:this.clone(!0),C(r[s])[t](n),c.apply(i,n.get());return this.pushStack(i)}}));var We=new RegExp("^("+ne+")(?!px)[a-z%]+$","i"),Be=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=n),t.getComputedStyle(e)},Ue=function(e,t,n){var i,r,o={};for(r in t)o[r]=e.style[r],e.style[r]=t[r];for(r in i=n.call(e),t)e.style[r]=o[r];return i},Qe=new RegExp(re.join("|"),"i");function Ke(e,t,n){var i,r,o,s,a=e.style;return(n=n||Be(e))&&(""!==(s=n.getPropertyValue(t)||n[t])||se(e)||(s=C.style(e,t)),!m.pixelBoxStyles()&&We.test(s)&&Qe.test(t)&&(i=a.width,r=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=r,a.maxWidth=o)),void 0!==s?s+"":s}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){c.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",oe.appendChild(c).appendChild(u);var e=n.getComputedStyle(u);i="1%"!==e.top,l=12===t(e.marginLeft),u.style.right="60%",s=36===t(e.right),r=36===t(e.width),u.style.position="absolute",o=12===t(u.offsetWidth/3),oe.removeChild(c),u=null}}function t(e){return Math.round(parseFloat(e))}var i,r,o,s,a,l,c=b.createElement("div"),u=b.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",m.clearCloneStyle="content-box"===u.style.backgroundClip,C.extend(m,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),s},pixelPosition:function(){return e(),i},reliableMarginLeft:function(){return e(),l},scrollboxSize:function(){return e(),o},reliableTrDimensions:function(){var e,t,i,r;return null==a&&(e=b.createElement("table"),t=b.createElement("tr"),i=b.createElement("div"),e.style.cssText="position:absolute;left:-11111px",t.style.height="1px",i.style.height="9px",oe.appendChild(e).appendChild(t).appendChild(i),r=n.getComputedStyle(t),a=parseInt(r.height)>3,oe.removeChild(e)),a}}))}();var $e=["Webkit","Moz","ms"],Ve=b.createElement("div").style,Ye={};function Xe(e){var t=C.cssProps[e]||Ye[e];return t||(e in Ve?e:Ye[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=$e.length;n--;)if((e=$e[n]+t)in Ve)return e}(e)||e)}var Ge=/^(none|table(?!-c[ea]).+)/,Je=/^--/,Ze={position:"absolute",visibility:"hidden",display:"block"},et={letterSpacing:"0",fontWeight:"400"};function tt(e,t,n){var i=ie.exec(t);return i?Math.max(0,i[2]-(n||0))+(i[3]||"px"):t}function nt(e,t,n,i,r,o){var s="width"===t?1:0,a=0,l=0;if(n===(i?"border":"content"))return 0;for(;s<4;s+=2)"margin"===n&&(l+=C.css(e,n+re[s],!0,r)),i?("content"===n&&(l-=C.css(e,"padding"+re[s],!0,r)),"margin"!==n&&(l-=C.css(e,"border"+re[s]+"Width",!0,r))):(l+=C.css(e,"padding"+re[s],!0,r),"padding"!==n?l+=C.css(e,"border"+re[s]+"Width",!0,r):a+=C.css(e,"border"+re[s]+"Width",!0,r));return!i&&o>=0&&(l+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-l-a-.5))||0),l}function it(e,t,n){var i=Be(e),r=(!m.boxSizingReliable()||n)&&"border-box"===C.css(e,"boxSizing",!1,i),o=r,s=Ke(e,t,i),a="offset"+t[0].toUpperCase()+t.slice(1);if(We.test(s)){if(!n)return s;s="auto"}return(!m.boxSizingReliable()&&r||!m.reliableTrDimensions()&&N(e,"tr")||"auto"===s||!parseFloat(s)&&"inline"===C.css(e,"display",!1,i))&&e.getClientRects().length&&(r="border-box"===C.css(e,"boxSizing",!1,i),(o=a in e)&&(s=e[a])),(s=parseFloat(s)||0)+nt(e,t,n||(r?"border":"content"),o,i,s)+"px"}function rt(e,t,n,i,r){return new rt.prototype.init(e,t,n,i,r)}C.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ke(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var r,o,s,a=V(t),l=Je.test(t),c=e.style;if(l||(t=Xe(a)),s=C.cssHooks[t]||C.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(r=s.get(e,!1,i))?r:c[t];"string"===(o=typeof n)&&(r=ie.exec(n))&&r[1]&&(n=ce(e,t,r),o="number"),null!=n&&n==n&&("number"!==o||l||(n+=r&&r[3]||(C.cssNumber[a]?"":"px")),m.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,i))||(l?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,i){var r,o,s,a=V(t);return Je.test(t)||(t=Xe(a)),(s=C.cssHooks[t]||C.cssHooks[a])&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=Ke(e,t,i)),"normal"===r&&t in et&&(r=et[t]),""===n||n?(o=parseFloat(r),!0===n||isFinite(o)?o||0:r):r}}),C.each(["height","width"],(function(e,t){C.cssHooks[t]={get:function(e,n,i){if(n)return!Ge.test(C.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?it(e,t,i):Ue(e,Ze,(function(){return it(e,t,i)}))},set:function(e,n,i){var r,o=Be(e),s=!m.scrollboxSize()&&"absolute"===o.position,a=(s||i)&&"border-box"===C.css(e,"boxSizing",!1,o),l=i?nt(e,t,i,a,o):0;return a&&s&&(l-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-nt(e,t,"border",!1,o)-.5)),l&&(r=ie.exec(n))&&"px"!==(r[3]||"px")&&(e.style[t]=n,n=C.css(e,t)),tt(0,n,l)}}})),C.cssHooks.marginLeft=ze(m.reliableMarginLeft,(function(e,t){if(t)return(parseFloat(Ke(e,"marginLeft"))||e.getBoundingClientRect().left-Ue(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),C.each({margin:"",padding:"",border:"Width"},(function(e,t){C.cssHooks[e+t]={expand:function(n){for(var i=0,r={},o="string"==typeof n?n.split(" "):[n];i<4;i++)r[e+re[i]+t]=o[i]||o[i-2]||o[0];return r}},"margin"!==e&&(C.cssHooks[e+t].set=tt)})),C.fn.extend({css:function(e,t){return Q(this,(function(e,t,n){var i,r,o={},s=0;if(Array.isArray(t)){for(i=Be(e),r=t.length;s<r;s++)o[t[s]]=C.css(e,t[s],!1,i);return o}return void 0!==n?C.style(e,t,n):C.css(e,t)}),e,t,arguments.length>1)}}),C.Tween=rt,rt.prototype={constructor:rt,init:function(e,t,n,i,r,o){this.elem=e,this.prop=n,this.easing=r||C.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=o||(C.cssNumber[n]?"":"px")},cur:function(){var e=rt.propHooks[this.prop];return e&&e.get?e.get(this):rt.propHooks._default.get(this)},run:function(e){var t,n=rt.propHooks[this.prop];return this.options.duration?this.pos=t=C.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rt.propHooks._default.set(this),this}},rt.prototype.init.prototype=rt.prototype,rt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=C.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){C.fx.step[e.prop]?C.fx.step[e.prop](e):1!==e.elem.nodeType||!C.cssHooks[e.prop]&&null==e.elem.style[Xe(e.prop)]?e.elem[e.prop]=e.now:C.style(e.elem,e.prop,e.now+e.unit)}}},rt.propHooks.scrollTop=rt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},C.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},C.fx=rt.prototype.init,C.fx.step={};var ot,st,at=/^(?:toggle|show|hide)$/,lt=/queueHooks$/;function ct(){st&&(!1===b.hidden&&n.requestAnimationFrame?n.requestAnimationFrame(ct):n.setTimeout(ct,C.fx.interval),C.fx.tick())}function ut(){return n.setTimeout((function(){ot=void 0})),ot=Date.now()}function ft(e,t){var n,i=0,r={height:e};for(t=t?1:0;i<4;i+=2-t)r["margin"+(n=re[i])]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function dt(e,t,n){for(var i,r=(ht.tweeners[t]||[]).concat(ht.tweeners["*"]),o=0,s=r.length;o<s;o++)if(i=r[o].call(n,t,e))return i}function ht(e,t,n){var i,r,o=0,s=ht.prefilters.length,a=C.Deferred().always((function(){delete l.elem})),l=function(){if(r)return!1;for(var t=ot||ut(),n=Math.max(0,c.startTime+c.duration-t),i=1-(n/c.duration||0),o=0,s=c.tweens.length;o<s;o++)c.tweens[o].run(i);return a.notifyWith(e,[c,i,n]),i<1&&s?n:(s||a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:C.extend({},t),opts:C.extend(!0,{specialEasing:{},easing:C.easing._default},n),originalProperties:t,originalOptions:n,startTime:ot||ut(),duration:n.duration,tweens:[],createTween:function(t,n){var i=C.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(i),i},stop:function(t){var n=0,i=t?c.tweens.length:0;if(r)return this;for(r=!0;n<i;n++)c.tweens[n].run(1);return t?(a.notifyWith(e,[c,1,0]),a.resolveWith(e,[c,t])):a.rejectWith(e,[c,t]),this}}),u=c.props;for(!function(e,t){var n,i,r,o,s;for(n in e)if(r=t[i=V(n)],o=e[n],Array.isArray(o)&&(r=o[1],o=e[n]=o[0]),n!==i&&(e[i]=o,delete e[n]),(s=C.cssHooks[i])&&"expand"in s)for(n in o=s.expand(o),delete e[i],o)n in e||(e[n]=o[n],t[n]=r);else t[i]=r}(u,c.opts.specialEasing);o<s;o++)if(i=ht.prefilters[o].call(c,e,u,c.opts))return v(i.stop)&&(C._queueHooks(c.elem,c.opts.queue).stop=i.stop.bind(i)),i;return C.map(u,dt,c),v(c.opts.start)&&c.opts.start.call(e,c),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always),C.fx.timer(C.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c}C.Animation=C.extend(ht,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ce(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){v(e)?(t=e,e=["*"]):e=e.match(q);for(var n,i=0,r=e.length;i<r;i++)n=e[i],ht.tweeners[n]=ht.tweeners[n]||[],ht.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var i,r,o,s,a,l,c,u,f="width"in t||"height"in t,d=this,h={},p=e.style,g=e.nodeType&&le(e),m=G.get(e,"fxshow");for(i in n.queue||(null==(s=C._queueHooks(e,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,d.always((function(){d.always((function(){s.unqueued--,C.queue(e,"fx").length||s.empty.fire()}))}))),t)if(r=t[i],at.test(r)){if(delete t[i],o=o||"toggle"===r,r===(g?"hide":"show")){if("show"!==r||!m||void 0===m[i])continue;g=!0}h[i]=m&&m[i]||C.style(e,i)}if((l=!C.isEmptyObject(t))||!C.isEmptyObject(h))for(i in f&&1===e.nodeType&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],null==(c=m&&m.display)&&(c=G.get(e,"display")),"none"===(u=C.css(e,"display"))&&(c?u=c:(de([e],!0),c=e.style.display||c,u=C.css(e,"display"),de([e]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===C.css(e,"float")&&(l||(d.done((function(){p.display=c})),null==c&&(u=p.display,c="none"===u?"":u)),p.display="inline-block")),n.overflow&&(p.overflow="hidden",d.always((function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}))),l=!1,h)l||(m?"hidden"in m&&(g=m.hidden):m=G.access(e,"fxshow",{display:c}),o&&(m.hidden=!g),g&&de([e],!0),d.done((function(){for(i in g||de([e]),G.remove(e,"fxshow"),h)C.style(e,i,h[i])}))),l=dt(g?m[i]:0,i,d),i in m||(m[i]=l.start,g&&(l.end=l.start,l.start=0))}],prefilter:function(e,t){t?ht.prefilters.unshift(e):ht.prefilters.push(e)}}),C.speed=function(e,t,n){var i=e&&"object"==typeof e?C.extend({},e):{complete:n||!n&&t||v(e)&&e,duration:e,easing:n&&t||t&&!v(t)&&t};return C.fx.off?i.duration=0:"number"!=typeof i.duration&&(i.duration in C.fx.speeds?i.duration=C.fx.speeds[i.duration]:i.duration=C.fx.speeds._default),null!=i.queue&&!0!==i.queue||(i.queue="fx"),i.old=i.complete,i.complete=function(){v(i.old)&&i.old.call(this),i.queue&&C.dequeue(this,i.queue)},i},C.fn.extend({fadeTo:function(e,t,n,i){return this.filter(le).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var r=C.isEmptyObject(e),o=C.speed(t,n,i),s=function(){var t=ht(this,C.extend({},e),o);(r||G.get(this,"finish"))&&t.stop(!0)};return s.finish=s,r||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each((function(){var t=!0,r=null!=e&&e+"queueHooks",o=C.timers,s=G.get(this);if(r)s[r]&&s[r].stop&&i(s[r]);else for(r in s)s[r]&&s[r].stop&&lt.test(r)&&i(s[r]);for(r=o.length;r--;)o[r].elem!==this||null!=e&&o[r].queue!==e||(o[r].anim.stop(n),t=!1,o.splice(r,1));!t&&n||C.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=G.get(this),i=n[e+"queue"],r=n[e+"queueHooks"],o=C.timers,s=i?i.length:0;for(n.finish=!0,C.queue(this,e,[]),r&&r.stop&&r.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<s;t++)i[t]&&i[t].finish&&i[t].finish.call(this);delete n.finish}))}}),C.each(["toggle","show","hide"],(function(e,t){var n=C.fn[t];C.fn[t]=function(e,i,r){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ft(t,!0),e,i,r)}})),C.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){C.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}})),C.timers=[],C.fx.tick=function(){var e,t=0,n=C.timers;for(ot=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||C.fx.stop(),ot=void 0},C.fx.timer=function(e){C.timers.push(e),C.fx.start()},C.fx.interval=13,C.fx.start=function(){st||(st=!0,ct())},C.fx.stop=function(){st=null},C.fx.speeds={slow:600,fast:200,_default:400},C.fn.delay=function(e,t){return e=C.fx&&C.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,i){var r=n.setTimeout(t,e);i.stop=function(){n.clearTimeout(r)}}))},function(){var e=b.createElement("input"),t=b.createElement("select").appendChild(b.createElement("option"));e.type="checkbox",m.checkOn=""!==e.value,m.optSelected=t.selected,(e=b.createElement("input")).value="t",e.type="radio",m.radioValue="t"===e.value}();var pt,gt=C.expr.attrHandle;C.fn.extend({attr:function(e,t){return Q(this,C.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){C.removeAttr(this,e)}))}}),C.extend({attr:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?C.prop(e,t,n):(1===o&&C.isXMLDoc(e)||(r=C.attrHooks[t.toLowerCase()]||(C.expr.match.bool.test(t)?pt:void 0)),void 0!==n?null===n?void C.removeAttr(e,t):r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:(e.setAttribute(t,n+""),n):r&&"get"in r&&null!==(i=r.get(e,t))?i:null==(i=C.find.attr(e,t))?void 0:i)},attrHooks:{type:{set:function(e,t){if(!m.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,i=0,r=t&&t.match(q);if(r&&1===e.nodeType)for(;n=r[i++];)e.removeAttribute(n)}}),pt={set:function(e,t,n){return!1===t?C.removeAttr(e,n):e.setAttribute(n,n),n}},C.each(C.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=gt[t]||C.find.attr;gt[t]=function(e,t,i){var r,o,s=t.toLowerCase();return i||(o=gt[s],gt[s]=r,r=null!=n(e,t,i)?s:null,gt[s]=o),r}}));var mt=/^(?:input|select|textarea|button)$/i,vt=/^(?:a|area)$/i;function yt(e){return(e.match(q)||[]).join(" ")}function bt(e){return e.getAttribute&&e.getAttribute("class")||""}function _t(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(q)||[]}C.fn.extend({prop:function(e,t){return Q(this,C.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[C.propFix[e]||e]}))}}),C.extend({prop:function(e,t,n){var i,r,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&C.isXMLDoc(e)||(t=C.propFix[t]||t,r=C.propHooks[t]),void 0!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:e[t]=n:r&&"get"in r&&null!==(i=r.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){var t=C.find.attr(e,"tabindex");return t?parseInt(t,10):mt.test(e.nodeName)||vt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),m.optSelected||(C.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),C.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){C.propFix[this.toLowerCase()]=this})),C.fn.extend({addClass:function(e){var t,n,i,r,o,s,a,l=0;if(v(e))return this.each((function(t){C(this).addClass(e.call(this,t,bt(this)))}));if((t=_t(e)).length)for(;n=this[l++];)if(r=bt(n),i=1===n.nodeType&&" "+yt(r)+" "){for(s=0;o=t[s++];)i.indexOf(" "+o+" ")<0&&(i+=o+" ");r!==(a=yt(i))&&n.setAttribute("class",a)}return this},removeClass:function(e){var t,n,i,r,o,s,a,l=0;if(v(e))return this.each((function(t){C(this).removeClass(e.call(this,t,bt(this)))}));if(!arguments.length)return this.attr("class","");if((t=_t(e)).length)for(;n=this[l++];)if(r=bt(n),i=1===n.nodeType&&" "+yt(r)+" "){for(s=0;o=t[s++];)for(;i.indexOf(" "+o+" ")>-1;)i=i.replace(" "+o+" "," ");r!==(a=yt(i))&&n.setAttribute("class",a)}return this},toggleClass:function(e,t){var n=typeof e,i="string"===n||Array.isArray(e);return"boolean"==typeof t&&i?t?this.addClass(e):this.removeClass(e):v(e)?this.each((function(n){C(this).toggleClass(e.call(this,n,bt(this),t),t)})):this.each((function(){var t,r,o,s;if(i)for(r=0,o=C(this),s=_t(e);t=s[r++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);else void 0!==e&&"boolean"!==n||((t=bt(this))&&G.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":G.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,i=0;for(t=" "+e+" ";n=this[i++];)if(1===n.nodeType&&(" "+yt(bt(n))+" ").indexOf(t)>-1)return!0;return!1}});var wt=/\r/g;C.fn.extend({val:function(e){var t,n,i,r=this[0];return arguments.length?(i=v(e),this.each((function(n){var r;1===this.nodeType&&(null==(r=i?e.call(this,n,C(this).val()):e)?r="":"number"==typeof r?r+="":Array.isArray(r)&&(r=C.map(r,(function(e){return null==e?"":e+""}))),(t=C.valHooks[this.type]||C.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,r,"value")||(this.value=r))}))):r?(t=C.valHooks[r.type]||C.valHooks[r.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(r,"value"))?n:"string"==typeof(n=r.value)?n.replace(wt,""):null==n?"":n:void 0}}),C.extend({valHooks:{option:{get:function(e){var t=C.find.attr(e,"value");return null!=t?t:yt(C.text(e))}},select:{get:function(e){var t,n,i,r=e.options,o=e.selectedIndex,s="select-one"===e.type,a=s?null:[],l=s?o+1:r.length;for(i=o<0?l:s?o:0;i<l;i++)if(((n=r[i]).selected||i===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=C(n).val(),s)return t;a.push(t)}return a},set:function(e,t){for(var n,i,r=e.options,o=C.makeArray(t),s=r.length;s--;)((i=r[s]).selected=C.inArray(C.valHooks.option.get(i),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),C.each(["radio","checkbox"],(function(){C.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=C.inArray(C(e).val(),t)>-1}},m.checkOn||(C.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),m.focusin="onfocusin"in n;var Et=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};C.extend(C.event,{trigger:function(e,t,i,r){var o,s,a,l,c,u,f,d,p=[i||b],g=h.call(e,"type")?e.type:e,m=h.call(e,"namespace")?e.namespace.split("."):[];if(s=d=a=i=i||b,3!==i.nodeType&&8!==i.nodeType&&!Et.test(g+C.event.triggered)&&(g.indexOf(".")>-1&&(m=g.split("."),g=m.shift(),m.sort()),c=g.indexOf(":")<0&&"on"+g,(e=e[C.expando]?e:new C.Event(g,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=m.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=i),t=null==t?[e]:C.makeArray(t,[e]),f=C.event.special[g]||{},r||!f.trigger||!1!==f.trigger.apply(i,t))){if(!r&&!f.noBubble&&!y(i)){for(l=f.delegateType||g,Et.test(l+g)||(s=s.parentNode);s;s=s.parentNode)p.push(s),a=s;a===(i.ownerDocument||b)&&p.push(a.defaultView||a.parentWindow||n)}for(o=0;(s=p[o++])&&!e.isPropagationStopped();)d=s,e.type=o>1?l:f.bindType||g,(u=(G.get(s,"events")||Object.create(null))[e.type]&&G.get(s,"handle"))&&u.apply(s,t),(u=c&&s[c])&&u.apply&&Y(s)&&(e.result=u.apply(s,t),!1===e.result&&e.preventDefault());return e.type=g,r||e.isDefaultPrevented()||f._default&&!1!==f._default.apply(p.pop(),t)||!Y(i)||c&&v(i[g])&&!y(i)&&((a=i[c])&&(i[c]=null),C.event.triggered=g,e.isPropagationStopped()&&d.addEventListener(g,Ct),i[g](),e.isPropagationStopped()&&d.removeEventListener(g,Ct),C.event.triggered=void 0,a&&(i[c]=a)),e.result}},simulate:function(e,t,n){var i=C.extend(new C.Event,n,{type:e,isSimulated:!0});C.event.trigger(i,null,t)}}),C.fn.extend({trigger:function(e,t){return this.each((function(){C.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0];if(n)return C.event.trigger(e,t,n,!0)}}),m.focusin||C.each({focus:"focusin",blur:"focusout"},(function(e,t){var n=function(e){C.event.simulate(t,e.target,C.event.fix(e))};C.event.special[t]={setup:function(){var i=this.ownerDocument||this.document||this,r=G.access(i,t);r||i.addEventListener(e,n,!0),G.access(i,t,(r||0)+1)},teardown:function(){var i=this.ownerDocument||this.document||this,r=G.access(i,t)-1;r?G.access(i,t,r):(i.removeEventListener(e,n,!0),G.remove(i,t))}}}));var Tt=n.location,xt={guid:Date.now()},St=/\?/;C.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new n.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||C.error("Invalid XML: "+e),t};var Dt=/\[\]$/,At=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,kt=/^(?:input|select|textarea|keygen)/i;function It(e,t,n,i){var r;if(Array.isArray(t))C.each(t,(function(t,r){n||Dt.test(e)?i(e,r):It(e+"["+("object"==typeof r&&null!=r?t:"")+"]",r,n,i)}));else if(n||"object"!==E(t))i(e,t);else for(r in t)It(e+"["+r+"]",t[r],n,i)}C.param=function(e,t){var n,i=[],r=function(e,t){var n=v(t)?t():t;i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!C.isPlainObject(e))C.each(e,(function(){r(this.name,this.value)}));else for(n in e)It(n,e[n],t,r);return i.join("&")},C.fn.extend({serialize:function(){return C.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=C.prop(this,"elements");return e?C.makeArray(e):this})).filter((function(){var e=this.type;return this.name&&!C(this).is(":disabled")&&kt.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!ge.test(e))})).map((function(e,t){var n=C(this).val();return null==n?null:Array.isArray(n)?C.map(n,(function(e){return{name:t.name,value:e.replace(At,"\r\n")}})):{name:t.name,value:n.replace(At,"\r\n")}})).get()}});var Ot=/%20/g,Lt=/#.*$/,jt=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ht=/^(?:GET|HEAD)$/,qt=/^\/\//,Rt={},Mt={},Ft="*/".concat("*"),Wt=b.createElement("a");function Bt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var i,r=0,o=t.toLowerCase().match(q)||[];if(v(n))for(;i=o[r++];)"+"===i[0]?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function Ut(e,t,n,i){var r={},o=e===Mt;function s(a){var l;return r[a]=!0,C.each(e[a]||[],(function(e,a){var c=a(t,n,i);return"string"!=typeof c||o||r[c]?o?!(l=c):void 0:(t.dataTypes.unshift(c),s(c),!1)})),l}return s(t.dataTypes[0])||!r["*"]&&s("*")}function Qt(e,t){var n,i,r=C.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((r[n]?e:i||(i={}))[n]=t[n]);return i&&C.extend(!0,e,i),e}Wt.href=Tt.href,C.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Ft,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":C.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Qt(Qt(e,C.ajaxSettings),t):Qt(C.ajaxSettings,e)},ajaxPrefilter:Bt(Rt),ajaxTransport:Bt(Mt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var i,r,o,s,a,l,c,u,f,d,h=C.ajaxSetup({},t),p=h.context||h,g=h.context&&(p.nodeType||p.jquery)?C(p):C.event,m=C.Deferred(),v=C.Callbacks("once memory"),y=h.statusCode||{},_={},w={},E="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s)for(s={};t=Pt.exec(o);)s[t[1].toLowerCase()+" "]=(s[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=s[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return c?o:null},setRequestHeader:function(e,t){return null==c&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,_[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)T.always(e[T.status]);else for(t in e)y[t]=[y[t],e[t]];return this},abort:function(e){var t=e||E;return i&&i.abort(t),x(0,t),this}};if(m.promise(T),h.url=((e||h.url||Tt.href)+"").replace(qt,Tt.protocol+"//"),h.type=t.method||t.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(q)||[""],null==h.crossDomain){l=b.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Wt.protocol+"//"+Wt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=C.param(h.data,h.traditional)),Ut(Rt,h,t,T),c)return T;for(f in(u=C.event&&h.global)&&0==C.active++&&C.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Ht.test(h.type),r=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(Ot,"+")):(d=h.url.slice(r.length),h.data&&(h.processData||"string"==typeof h.data)&&(r+=(St.test(r)?"&":"?")+h.data,delete h.data),!1===h.cache&&(r=r.replace(jt,"$1"),d=(St.test(r)?"&":"?")+"_="+xt.guid+++d),h.url=r+d),h.ifModified&&(C.lastModified[r]&&T.setRequestHeader("If-Modified-Since",C.lastModified[r]),C.etag[r]&&T.setRequestHeader("If-None-Match",C.etag[r])),(h.data&&h.hasContent&&!1!==h.contentType||t.contentType)&&T.setRequestHeader("Content-Type",h.contentType),T.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+Ft+"; q=0.01":""):h.accepts["*"]),h.headers)T.setRequestHeader(f,h.headers[f]);if(h.beforeSend&&(!1===h.beforeSend.call(p,T,h)||c))return T.abort();if(E="abort",v.add(h.complete),T.done(h.success),T.fail(h.error),i=Ut(Mt,h,t,T)){if(T.readyState=1,u&&g.trigger("ajaxSend",[T,h]),c)return T;h.async&&h.timeout>0&&(a=n.setTimeout((function(){T.abort("timeout")}),h.timeout));try{c=!1,i.send(_,x)}catch(e){if(c)throw e;x(-1,e)}}else x(-1,"No Transport");function x(e,t,s,l){var f,d,b,_,w,E=t;c||(c=!0,a&&n.clearTimeout(a),i=void 0,o=l||"",T.readyState=e>0?4:0,f=e>=200&&e<300||304===e,s&&(_=function(e,t,n){for(var i,r,o,s,a=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"));if(i)for(r in a)if(a[r]&&a[r].test(i)){l.unshift(r);break}if(l[0]in n)o=l[0];else{for(r in n){if(!l[0]||e.converters[r+" "+l[0]]){o=r;break}s||(s=r)}o=o||s}if(o)return o!==l[0]&&l.unshift(o),n[o]}(h,T,s)),!f&&C.inArray("script",h.dataTypes)>-1&&(h.converters["text script"]=function(){}),_=function(e,t,n,i){var r,o,s,a,l,c={},u=e.dataTypes.slice();if(u[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(!(s=c[l+" "+o]||c["* "+o]))for(r in c)if((a=r.split(" "))[1]===o&&(s=c[l+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[r]:!0!==c[r]&&(o=a[0],u.unshift(a[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}(h,_,T,f),f?(h.ifModified&&((w=T.getResponseHeader("Last-Modified"))&&(C.lastModified[r]=w),(w=T.getResponseHeader("etag"))&&(C.etag[r]=w)),204===e||"HEAD"===h.type?E="nocontent":304===e?E="notmodified":(E=_.state,d=_.data,f=!(b=_.error))):(b=E,!e&&E||(E="error",e<0&&(e=0))),T.status=e,T.statusText=(t||E)+"",f?m.resolveWith(p,[d,E,T]):m.rejectWith(p,[T,E,b]),T.statusCode(y),y=void 0,u&&g.trigger(f?"ajaxSuccess":"ajaxError",[T,h,f?d:b]),v.fireWith(p,[T,E]),u&&(g.trigger("ajaxComplete",[T,h]),--C.active||C.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return C.get(e,t,n,"json")},getScript:function(e,t){return C.get(e,void 0,t,"script")}}),C.each(["get","post"],(function(e,t){C[t]=function(e,n,i,r){return v(n)&&(r=r||i,i=n,n=void 0),C.ajax(C.extend({url:e,type:t,dataType:r,data:n,success:i},C.isPlainObject(e)&&e))}})),C.ajaxPrefilter((function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),C._evalUrl=function(e,t,n){return C.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){C.globalEval(e,t,n)}})},C.fn.extend({wrapAll:function(e){var t;return this[0]&&(v(e)&&(e=e.call(this[0])),t=C(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e})).append(this)),this},wrapInner:function(e){return v(e)?this.each((function(t){C(this).wrapInner(e.call(this,t))})):this.each((function(){var t=C(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=v(e);return this.each((function(n){C(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){C(this).replaceWith(this.childNodes)})),this}}),C.expr.pseudos.hidden=function(e){return!C.expr.pseudos.visible(e)},C.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},C.ajaxSettings.xhr=function(){try{return new n.XMLHttpRequest}catch(e){}};var Kt={0:200,1223:204},zt=C.ajaxSettings.xhr();m.cors=!!zt&&"withCredentials"in zt,m.ajax=zt=!!zt,C.ajaxTransport((function(e){var t,i;if(m.cors||zt&&!e.crossDomain)return{send:function(r,o){var s,a=e.xhr();if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s];for(s in e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||r["X-Requested-With"]||(r["X-Requested-With"]="XMLHttpRequest"),r)a.setRequestHeader(s,r[s]);t=function(e){return function(){t&&(t=i=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?o(0,"error"):o(a.status,a.statusText):o(Kt[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=t(),i=a.onerror=a.ontimeout=t("error"),void 0!==a.onabort?a.onabort=i:a.onreadystatechange=function(){4===a.readyState&&n.setTimeout((function(){t&&i()}))},t=t("abort");try{a.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}})),C.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),C.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return C.globalEval(e),e}}}),C.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),C.ajaxTransport("script",(function(e){var t,n;if(e.crossDomain||e.scriptAttrs)return{send:function(i,r){t=C("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&r("error"===e.type?404:200,e.type)}),b.head.appendChild(t[0])},abort:function(){n&&n()}}}));var $t,Vt=[],Yt=/(=)\?(?=&|$)|\?\?/;C.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Vt.pop()||C.expando+"_"+xt.guid++;return this[e]=!0,e}}),C.ajaxPrefilter("json jsonp",(function(e,t,i){var r,o,s,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=v(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return s||C.error(r+" was not called"),s[0]},e.dataTypes[0]="json",o=n[r],n[r]=function(){s=arguments},i.always((function(){void 0===o?C(n).removeProp(r):n[r]=o,e[r]&&(e.jsonpCallback=t.jsonpCallback,Vt.push(r)),s&&v(o)&&o(s[0]),s=o=void 0})),"script"})),m.createHTMLDocument=(($t=b.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===$t.childNodes.length),C.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(m.createHTMLDocument?((i=(t=b.implementation.createHTMLDocument("")).createElement("base")).href=b.location.href,t.head.appendChild(i)):t=b),o=!n&&[],(r=k.exec(e))?[t.createElement(r[1])]:(r=Ee([e],t,o),o&&o.length&&C(o).remove(),C.merge([],r.childNodes)));var i,r,o},C.fn.load=function(e,t,n){var i,r,o,s=this,a=e.indexOf(" ");return a>-1&&(i=yt(e.slice(a)),e=e.slice(0,a)),v(t)?(n=t,t=void 0):t&&"object"==typeof t&&(r="POST"),s.length>0&&C.ajax({url:e,type:r||"GET",dataType:"html",data:t}).done((function(e){o=arguments,s.html(i?C("<div>").append(C.parseHTML(e)).find(i):e)})).always(n&&function(e,t){s.each((function(){n.apply(this,o||[e.responseText,t,e])}))}),this},C.expr.pseudos.animated=function(e){return C.grep(C.timers,(function(t){return e===t.elem})).length},C.offset={setOffset:function(e,t,n){var i,r,o,s,a,l,c=C.css(e,"position"),u=C(e),f={};"static"===c&&(e.style.position="relative"),a=u.offset(),o=C.css(e,"top"),l=C.css(e,"left"),("absolute"===c||"fixed"===c)&&(o+l).indexOf("auto")>-1?(s=(i=u.position()).top,r=i.left):(s=parseFloat(o)||0,r=parseFloat(l)||0),v(t)&&(t=t.call(e,n,C.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+r),"using"in t?t.using.call(e,f):("number"==typeof f.top&&(f.top+="px"),"number"==typeof f.left&&(f.left+="px"),u.css(f))}},C.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){C.offset.setOffset(this,e,t)}));var t,n,i=this[0];return i?i.getClientRects().length?(t=i.getBoundingClientRect(),n=i.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,i=this[0],r={top:0,left:0};if("fixed"===C.css(i,"position"))t=i.getBoundingClientRect();else{for(t=this.offset(),n=i.ownerDocument,e=i.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===C.css(e,"position");)e=e.parentNode;e&&e!==i&&1===e.nodeType&&((r=C(e).offset()).top+=C.css(e,"borderTopWidth",!0),r.left+=C.css(e,"borderLeftWidth",!0))}return{top:t.top-r.top-C.css(i,"marginTop",!0),left:t.left-r.left-C.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent;e&&"static"===C.css(e,"position");)e=e.offsetParent;return e||oe}))}}),C.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var n="pageYOffset"===t;C.fn[e]=function(i){return Q(this,(function(e,i,r){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===r)return o?o[t]:e[i];o?o.scrollTo(n?o.pageXOffset:r,n?r:o.pageYOffset):e[i]=r}),e,i,arguments.length)}})),C.each(["top","left"],(function(e,t){C.cssHooks[t]=ze(m.pixelPosition,(function(e,n){if(n)return n=Ke(e,t),We.test(n)?C(e).position()[t]+"px":n}))})),C.each({Height:"height",Width:"width"},(function(e,t){C.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,i){C.fn[i]=function(r,o){var s=arguments.length&&(n||"boolean"!=typeof r),a=n||(!0===r||!0===o?"margin":"border");return Q(this,(function(t,n,r){var o;return y(t)?0===i.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===r?C.css(t,n,a):C.style(t,n,r,a)}),t,s?r:void 0,s)}}))})),C.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){C.fn[t]=function(e){return this.on(t,e)}})),C.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){C.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}));var Xt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;C.proxy=function(e,t){var n,i,r;if("string"==typeof t&&(n=e[t],t=e,e=n),v(e))return i=a.call(arguments,2),(r=function(){return e.apply(t||this,i.concat(a.call(arguments)))}).guid=e.guid=e.guid||C.guid++,r},C.holdReady=function(e){e?C.readyWait++:C.ready(!0)},C.isArray=Array.isArray,C.parseJSON=JSON.parse,C.nodeName=N,C.isFunction=v,C.isWindow=y,C.camelCase=V,C.type=E,C.now=Date.now,C.isNumeric=function(e){var t=C.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},C.trim=function(e){return null==e?"":(e+"").replace(Xt,"")},void 0===(i=function(){return C}.apply(t,[]))||(e.exports=i);var Gt=n.jQuery,Jt=n.$;return C.noConflict=function(e){return n.$===C&&(n.$=Jt),e&&n.jQuery===C&&(n.jQuery=Gt),C},void 0===r&&(n.jQuery=n.$=C),C}))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){}]);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/js/ge_com_unified.script.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/ge_colorbox/ge_colorbox.js. */
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/ge_colorbox/ge_colorbox.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/js/ge-slick-slider.js. */
(function ($, Drupal) {
  eventsSlick();

  function eventsSlick() {
    if ($('.slider_container').length > 0) {
      $(".slider_container").slick({
        dots: false,
        arrows: true,
        slidesToShow: 3.4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [{
          breakpoint: 991,
          settings: {
            slidesToShow: 2.3
          }
        }, {
          breakpoint: 540,
          settings: {
            slidesToShow: 1.3
          } // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object

        }]
      });
    }
  }
    if($('#stickySidenav.ge-salesforce').length > 0) {
        $("input#email").change(function(){
            if($(this).val() == "") {
                $("#stickySidenav.ge-salesforce .acknowledgement").addClass('hidden');
            }
            else {
                $("#stickySidenav.ge-salesforce .acknowledgement").removeClass('hidden');
            }
        });
        
        document.getElementById("salesform").reset();
        
        $("input:checkbox.opt-1").change(function(){
            if($(".opt-1").is(':checked')) {
                $(".opt-2").prop("disabled", true);
            }
            else {
                $(".opt-2").prop("disabled", false);
            }
        });
        $("input:checkbox.opt-2").change(function(){
            if($(".opt-2").is(':checked')) {
                $(".opt-1").prop("disabled", true);
            }
            else {
                $(".opt-1").prop("disabled", false);
            }
        });
    }
})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/themes/custom/ge_com_unified/assets/js/ge-slick-slider.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/themes/custom/ge_unified/assets/js/ge_unified_menu.js. */
!function($,Drupal){$(document).ready(function(){$("a.email-icon.mobilenav-link").attr("href",Drupal.ge_unified_menu.contact_link),$("a.globe-icon.mobilenav-link").attr("href",Drupal.ge_unified_menu.global_directory),$("a.ge-stock-ticker").attr("href",Drupal.ge_unified_menu.ge_stock_ticker_path)})}(jQuery,drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/themes/custom/ge_unified/assets/js/ge_unified_menu.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/gutenberg-editor.js. */
(function ($) {
  
  $(document).ajaxSend(function(event, request, settings) {    
    if ( settings.url == "/editor/media/dialog?types=image" ) {
      $(".page-content.gutenberg-full-editor .overlay").fadeIn(300);　
    }
  });	

  $(document).ajaxComplete(function (event, request, settings) {
    if ( settings.url == "/editor/media/dialog?types=image" ) {
      $(".page-content.gutenberg-full-editor .overlay").fadeOut(300);
    }
  });	  
  
})(jQuery);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/gutenberg-editor.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-sub-navigation.js. */
// Place your frontend scripts here
// import $ from 'jquery';
// import jquery from 'jquery';

(function ($, Drupal) {
    $.fn.subNav = function (options) {
        const DEFAULT_SELECTORS = {
            navActiveClass: 'active',       // Selected nav item modifier class
            navStickyClass: 'sticky',       // Sticky nav modifier class
            sectionSelector: 'section'       // Section id, class or tag selector
        };

        // Merge options with defaults
        const selectors = $.extend({}, DEFAULT_SELECTORS, options);

        // Set jQuery DOM elements
        const $subNavGE = this;
        const $navLinks = $subNavGE.find('a');
        const $sections = $(selectors.sectionSelector);

        const navHeight = $subNavGE.outerHeight();
        const scrollTopOffset = $sections.first().outerHeight() + navHeight // height calculated

        let currentScrollPosition = 0;
        let sectionOffsetArray = [];


        function initialise() {
            calculateOffsets();
            bindEvents();
        }

        function bindEvents() {
            $navLinks.on('click', onClick);
            $(window).on('scroll', throttle(onScroll, 50));
        }

        function onClick(e) {
            e.preventDefault();
            const targetEl = $(this).attr('href');

            if ($(targetEl).length) {
                selectNavItem(this);

                if (window.scroll) {
                    window.scroll({
                        top: $(targetEl).offset().top - navHeight,
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    $('html, body').animate({
                        scrollTop: $(targetEl).offset().top - navHeight
                    });
                }
            }
        }

        function onScroll() {
            var scrollTop = $(document).scrollTop() + navHeight,
                closestPosition = findClosestNumber(scrollTop, sectionOffsetArray);

            // select navbar item
            if (closestPosition !== currentScrollPosition) {
                selectNavItem('.section-offset-' + closestPosition);
                currentScrollPosition = closestPosition;
            }

            // fix navbar
            if (scrollTop > scrollTopOffset) {
                $subNavGE.addClass(selectors.navStickyClass); // add your code here



                // show and hide nav item button
                if ($(window).width() >= 768) {
                    $(".show").show();

                    $(".show").click(function (e) { // on click expand navigation
                        $(".sticky li h6 a").show(200) && $(".show").hide();
                        e.stopPropagation();
                        /*	$(".active").css("background-color", "#1e2f46");
                            $('.lightBox').addClass('lightBoxOverly');
                            $('.lightBox').css({
                                'display': 'block',
                                'position': 'fixed',
                                'z-index': '-1',
                                'height': '100%',
                                'opacity': '0.7',
                                'top': '0',
                                'left': '0',
                                'right': '0',
                                'bottom':'0',
                                'background-color': 'rgba(0,0,0,.7)',
                            });     */
                    });
                    /* *///.dd-lightbox
                    $(document).click(function () {
                        $(".sticky li h6 a").hide() && $(".sticky li h6 a.active").show() && $(".show").show();
                        //$(".lightBox").removeClass("lightBoxOverly");
                        //$(".lightBox").removeAttr("style");

                    });
                    $(document).scroll(function () {
                        $(".sticky li h6 a").hide() && $(".sticky li h6 a.active").show() && $(".show").show();
                        // $(".lightBox").removeClass("lightBoxOverly");
                        // $(".lightBox").removeAttr("style");
                    });
                }

            }

            else {
                $subNavGE.removeClass(selectors.navStickyClass);
                $(".wp-block-custom-ge-sub-navigation .subNavGE ul li h6 a").removeAttr("style");// remove inline style
                $(".show").removeAttr("style");
                // $(".lightBox").removeClass("lightBoxOverly");

                // clear hide show button
                $(document).click(function () {
                    $(".show").hide();// for the more menu
                });
                $(document).scroll(function () {
                    $(".show").hide();// for the more menu
                });
            }
        }



        function calculateOffsets() {
            $sections.each(function (index) {
                const el = $(this)[0];
                const offsetTop = getOffsetTop(el);

                sectionOffsetArray.push(offsetTop);
                getNavItem(el).addClass('section-offset-' + offsetTop);
            });
        }

        function getOffsetTop(el) {
            const rect = el.getBoundingClientRect(),
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            return Math.round(rect.top + scrollTop);
        }

        function getNavItem(el) {
            return $('.wp-block-custom-ge-sub-navigation .subNavGE a[href="#' + $(el).attr('id') + '"]');
        }

        function selectNavItem(el) {
            if (!$subNavGE.hasClass(selectors.navStickyClass)) {
                $subNavGE.addClass(selectors.navStickyClass);
            }
            $navLinks.removeClass(selectors.navActiveClass);
            $(el).addClass(selectors.navActiveClass);
            $(".wp-block-custom-ge-sub-navigation .subNavGE ul li h6 a").removeAttr("style");// remove inline style

        }

        function findClosestNumber(num, arr) {
            return arr.reduce(function (prev, curr) {
                return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
            });
        }

        function throttle(func, delay) {
            let timer = 0;

            return function () {
                const context = this,
                    args = [].slice.call(arguments);

                clearTimeout(timer);
                timer = setTimeout(function () {
                    func.apply(context, args);
                }, delay);
            };
        }
        initialise();
    };

    if ($('.wp-block-custom-ge-sub-navigation .subNavGE h6 a').length > 0) {
        $('.wp-block-custom-ge-sub-navigation .subNavGE li').addClass('padd-LR');
    } else {
        $('.wp-block-custom-ge-sub-navigation .subNavGE li').removeClass('padd-LR');
    }

    // sticky navigation
    $(document).ready(function () {
        $('.wp-block-custom-ge-sub-navigation .subNavGE').subNav();
    });

    $(window).resize(function () {
        $('.wp-block-custom-ge-sub-navigation .subNavGE').subNav();
    });


    // mobile and tablet view port
    $(document).ready(function () {
        // $(window).resize(function(){

        if ($(window).width() <= 767) {
            // grab the initial top offset of the navigation
            var subNav = function () {
                var subNavTop = $('.wp-block-custom-ge-sub-navigation .subNavGE').offset();
                // our function that decides weather the navigation bar should have "fixed" css position or not.
                var scrollTop = $(window).scrollTop() - 81; // our current vertical position from the top
                // if we've scrolled more than the navigation, change its position to fixed to stick to top,
                // otherwise change it back to relative
                if (scrollTop == subNavTop) {
                    $('.wp-block-custom-ge-sub-navigation .subNavGE').addClass('animation');
                } else {
                    $('.wp-block-custom-ge-sub-navigation .subNavGE').removeClass('left');
                    $(".wp-block-custom-ge-sub-navigation .subNavGE").removeAttr("style");
                }
                if (($('.wp-block-custom-ge-sub-navigation .subNavGE ul li a').hasClass('active'))) {
                    var activeMenu = $('.active').offset();
                    var activeMenuPostion = activeMenu.left;
                    // third list element offset
                    var first = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(1)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var firstLeft = first.left;
                    var firstPossion = JSON.stringify(firstLeft); // converted offset object value to string
                    //forth list element offset
                    var second = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(2)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var secondLeft = second.left;
                    var secondPossion = JSON.stringify(secondLeft); // converted offset object value to string
                    // third list element offset
                    var third = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(3)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var thirdLeft = third.left;
                    var thirdPossion = JSON.stringify(thirdLeft); // converted offset object value to string
                    //forth list element offset
                    var fourth = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(4)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var fourthLeft = fourth.left;
                    var fourthPossion = JSON.stringify(fourthLeft); // converted offset object value to string
                    // third list element offset
                    var fifth = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(3)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var fifthLeft = fifth.left;
                    var fifthPossion = JSON.stringify(fifthLeft); // converted offset object value to string
                    //forth list element offset
                    var six = $(".wp-block-custom-ge-sub-navigation .subNavGE ul li:nth-child(5)").offset(); // offset valu of the 3rd navigation bar of navigation
                    var sixLeft = six.left;
                    var sixPossion = JSON.stringify(sixLeft); // converted offset object value to string

                    //if ($(window).innerWidth() <= 425) {
                        if ($(window).width() <= 425 && activeMenuPostion > thirdPossion) {
                            $('.wp-block-custom-ge-sub-navigation .subNavGE ul').addClass('scrolled');
                            $('.scrolled').css({
                                'left': - 100,
                                'behavior': 'smooth',
                                'transition-property': 'all',
                                'transition-property': 'transform',
                                //'position': 'absolute',
                            });

                            $(".wp-block-custom-ge-sub-navigation .subNavGE ul").on("swipe",function(){
                                $(".wp-block-custom-ge-sub-navigation .subNavGE ul").removeAttr("style");
                              });
                        }

                        else {
                            $(".wp-block-custom-ge-sub-navigation .subNavGE ul").removeAttr("style");
                        }

                        if (activeMenuPostion > fourthPossion) {
                            $('.wp-block-custom-ge-sub-navigation .subNavGE ul').addClass('scrolled');
                            $('.scrolled').css({
                                'left': -300,
                                'behavior': 'smooth',
                                'transition-property': 'all',
                                'transition-property': 'transform',
                                'transition-duration': '0.2s',
                            });

                            $(".wp-block-custom-ge-sub-navigation .subNavGE ul").on("swipe",function(){
                                $(".wp-block-custom-ge-sub-navigation .subNavGE ul").removeAttr("style");
                              });
                        }

                        else {
                            $(".wp-block-custom-ge-sub-navigation .subNavGE ul").removeAttr("style");
                        }
                }
            };
            // sticky function
            subNav();
            // and run it again every time you scroll
            // scroll

            $(window).scroll(function () { subNav(); });
           // $(window).resize(function () { subNav(); });
         //   $(window).on('resize', function () { subNav().reload(); });
        }

        //  $(window).on('resize',function(){location.reload();});
        /* $(window).bind('resize',function(){
              window.location.href = window.location.href;
         }); */

    // For the window Refresh
        var context;
        var $window = $(window);
        // run this right away to set context
        if ($window.width() <= 768) {
            context = 'small';
        }/* else if (768 < $window.width() < 970) {
            context = 'medium';
        } else {
            context = 'large';
        }*/

        // refresh the page only if you're crossing into a context
        // that isn't already set
        $(window).resize(function () {
            if (($window.width() <= 768) && (context != 'small')) {
                //refresh the page
                location.reload();
            } /*else if ((768 < $window.width() < 970) && (context != 'medium')) {
                location.reload();
            } else if (context != 'large') {
                location.reload();
            }*/
        });
    });

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-sub-navigation.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-faq.js. */

var faq = document.getElementsByClassName("faqItem");
var itemFaq;

for (itemFaq = 0; itemFaq < faq.length; itemFaq++) {
  faq[itemFaq].addEventListener("click", function () {
    this.classList.toggle("active");
    var panelAcc = this.nextElementSibling;
    if (panelAcc.style.maxHeight) {
      panelAcc.style.maxHeight = null;
    } else {
      panelAcc.style.maxHeight = panelAcc.scrollHeight + "px";
    }
  });
}

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-faq.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {

  document.documentElement.setAttribute("data-browser", navigator.userAgent);
  
  $(document).ready(function(){

    for(var i = 0; i <= 9; i++) {   
      if ($(".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .slider-items").length) {
        // Get count of slides
        $(".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .slider-items").on("init reinit", function(event, slick){
          if (slick.slideCount > 0 && !isNaN(slick.slideCount)) {
            var slideMargin = parseInt($(slick.$slides[0]).css('margin-right'));
            var slideTotalWidth = slick.$slides[0].clientWidth + slideMargin;
            var slidesWidth = (slideTotalWidth * slick.slideCount) - slideMargin;

            //check if total width of slides is less than the slider window
            if (slidesWidth < slick.$slider[0].clientWidth ) {
              $(".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] div.carousel-control").addClass("control-hidden");
            }
            else {
              $(".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] div.carousel-control").removeClass("control-hidden");
            }        
          }
        });

        $(".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .slider-items").slick({
          speed: 300,
          slidesToShow: 3.25,
          slidesToScroll: 1,
          
          prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
          nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
          
          infinite: false,
          mobileFirst: true,
          rows: 1,
          variableWidth: true,
          
          responsive: [{
              breakpoint: 1200, //mf min(1200)
              settings: {
                slidesToShow: 2.2,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 992,  //mf min(992)
              settings: {
                slidesToShow: 1.8,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 767, //mf min(767)
              settings: {
                slidesToShow: 1.6,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 576,  //mf min(576)
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
                centerMode: true,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {          
              breakpoint: 300,  //mf min(320)
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight[data-ge-spotlight-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            },
            

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]              
        }); 
        
      }
    }

  });  
  
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight-large.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {

  document.documentElement.setAttribute("data-browser", navigator.userAgent);

  $(document).ready(function(){

    for(var i = 0; i <= 9; i++) { 
      if ($(".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .slider-items").length) {
        // Get count of slides
        $(".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .slider-items").on('init reinit', function(event, slick){
          if (slick.slideCount > 0 && !isNaN(slick.slideCount)) {
            var slideMargin = parseInt($(slick.$slides[0]).css('margin-right'));
            var slideTotalWidth = slick.$slides[0].clientWidth + slideMargin;
            var slidesWidth = (slideTotalWidth * slick.slideCount) - slideMargin;

            //check if total width of slides is less than the slider window
            if (slidesWidth < slick.$slider[0].clientWidth ) {
              $(".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] div.carousel-control").addClass("control-hidden");
            }
            else {
              $(".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] div.carousel-control").removeClass("control-hidden");
            }
          }  
        });
        
        $(".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .slider-items").slick({
          speed: 300,
          slidesToShow: 3.25,
          slidesToScroll: 1,
          
          prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
          nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
          
          infinite: false,
          mobileFirst: true,
          rows: 1,
          variableWidth: true,
          
          responsive: [{
              breakpoint: 1200, //mf min(1200)
              settings: {
                slidesToShow: 2.25,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 992,  //mf min(992)
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 768, //mf min(768)
              settings: {
                slidesToShow: 1.6,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 576,  //mf min(576)
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {          
              breakpoint: 300,  //mf min(320)
              settings: {
                slidesToShow: 1, //1.2
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-large[data-ge-spotlight-large-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            },
            
            
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]              
        });    
        
      }    
    }
    
  });
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight-large.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight-small.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {

  document.documentElement.setAttribute("data-browser", navigator.userAgent);

  $(document).ready(function(){

    for(var i = 0; i <= 9; i++) { 
      if ($(".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .slider-items").length) {
        // Get count of slides
        $(".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .slider-items").on('init reinit', function(event, slick){
          if (slick.slideCount > 0 && !isNaN(slick.slideCount)) {
            var slideMargin = parseInt($(slick.$slides[0]).css('margin-right'));
            var slideTotalWidth = slick.$slides[0].clientWidth + slideMargin;
            var slidesWidth = (slideTotalWidth * slick.slideCount) - slideMargin;

            //check if total width of slides is less than the slider window
            if (slidesWidth < slick.$slider[0].clientWidth ) {
              $(".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] div.carousel-control").addClass("control-hidden");
            }
            else {
              $(".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] div.carousel-control").removeClass("control-hidden");
            }
          }  
        });
        
        $(".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .slider-items").slick({
          speed: 300,
          slidesToShow: 3.25,
          slidesToScroll: 1,
          
          prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
          nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
          
          infinite: false,
          mobileFirst: true,
          rows: 1,
          variableWidth: true,
          
          responsive: [{
              breakpoint: 1200, //mf min(1200)
              settings: {
                slidesToShow: 2.25,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 992,  //mf min(992)
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 768, //mf min(768)
              settings: {
                slidesToShow: 1.6,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {
              breakpoint: 576,  //mf min(576)
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            }, {          
              breakpoint: 300,  //mf min(320)
              settings: {
                slidesToShow: 1, //1.2
                slidesToScroll: 1,
                rows: 1,
                prevArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-prev",  
                nextArrow: ".wp-block-custom-ge-spotlight-small[data-ge-spotlight-small-instance-id = '" + i + "'] .ctrl-next",
                variableWidth: true,
              },
            },
            
            
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]              
        });    
        
      }    
    }
    
  });
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-spotlight-small.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-landing.js. */
(function ($, Drupal) {
var $animation_elements = $('.card');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function () {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

// mobile and tablet view port
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-landing.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-parallax.js. */

// Place your frontend scripts here
// Parallax Animaton variant 1
(function ($, Drupal) {
$(window).scroll(function () {

  for (var i = 0; i <= 9; i++) {
    var gePrallaxV1Top = $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide1");
    if (gePrallaxV1Top.length) {
      var gePrallaxV1TopPosition = gePrallaxV1Top.offset().top;
      var gePrallaxV1ScrollTop = $(window).scrollTop() + 141;
      var gePrallaxV1ScrollTopSmallDevice = $(window).scrollTop() + 300;
      if ($(window).width() >= 769 && gePrallaxV1ScrollTop >= gePrallaxV1TopPosition) {
        $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide1").css({
          'opacity': 0,
          'transition': 'all 0.9s ease',
        });
      }

      else if ($(window).width() <= 768 && gePrallaxV1ScrollTopSmallDevice >= gePrallaxV1TopPosition) {
        $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide1").css({
          'opacity': 0,
          'transition': 'all 0.9s ease',
        });
      }

      else {
        $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide1").css({
          'opacity': 0.93,
          'transition': 'all 0.9s ease',
        });
      }
    }

    // Second content slide
    var gePrallaxV1SecSlide = $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide2");
    if (gePrallaxV1SecSlide.length) {
      var gePrallaxV1SecSlideTop = gePrallaxV1SecSlide.offset().top + 300 ;
      var gePrallaxV1SecSlideHeight = $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .ge-prallax-v1-slide2").outerHeight();
      if ($(window).scrollTop() >= gePrallaxV1SecSlideTop + gePrallaxV1SecSlideHeight - window.innerHeight) {
        //console.log("second parallax section");
        $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .gePrallaxV1SecSlide").css({
          'opacity': 1,
          'transition': 'all 0.9s ease',
        });
      }
      else {
        $(".wp-block-custom-ge-parallax[data-ge-parallax-instance-id = '" + i + "'] .gePrallaxV1SecSlide").css({
          'opacity': 0,
          'transition': 'all 0.9s ease',
        });
      }
    }
  }
});


  // end
})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-parallax.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-landing-v1.js. */
(function ($, Drupal) {
  
  // script for the GE youtube video block (hero-landing-v1 block 
  $(document).ready(function() {
    $('.wp-block-custom-ge-hero-landing-v1 .play-button').on('click', function(ev) { 
      $(".wp-block-custom-ge-hero-landing-v1 #iframing").trigger('click');
      $(".wp-block-custom-ge-hero-landing-v1 #iframing").addClass('active');
      $(".wp-block-custom-ge-hero-landing-v1 #iframing")[0].src += "&autoplay=1";
      $(".wp-block-custom-ge-hero-landing-v1 h1").hide();
      
      // video traking start
      var videoURLs = $('.wp-block-custom-ge-hero-landing-v1 .video-player iframe').attr('src');
      var videotitles = $(this).parents('.wp-block-custom-ge-hero-landing-v1').find('h1').html();
      var stripedtitle = videotitles.replace(/<[^>]+>/g, '');
      $.trim(stripedtitle);
      dataLayer.push({
        'event': 'videoPlay',
        'eventCategory': 'content',
        'eventAction': 'video engagement',
        'videoProvider': 'Youtube',
        'videoStatus': 'Open',
        'videoURL': videoURLs,
        'videoTitle': stripedtitle
      });
      // end 
    
      ev.preventDefault(); 

    });
  });
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-landing-v1.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-video-block.js. */
(function ($, Drupal) {
// script for the GE Hero video block (hero-landing-v1 block
  $(document).ready(function () {
/*
    for(var i = 1; i <= 9; i++) {
      if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "']").length) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] .play-button").on("click", function (ev) {
          $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] .play-button").hide();
          $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] #iframing" + i + ".video-player").addClass('active');
          $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '" + i + "'] #iframing" + i + ".video-player").get(0).play();
          ev.preventDefault();
        });
      }
    }
*/

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] #iframing1.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '1'] #iframing1.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] #iframing2.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '2'] #iframing2.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] #iframing3.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '3'] #iframing3.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] #iframing4.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '4'] #iframing4.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] #iframing5.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '5'] #iframing5.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] #iframing6.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '6'] #iframing6.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] #iframing7.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '7'] #iframing7.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] #iframing8.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '8'] #iframing8.video-player").get(0).play();
        ev.preventDefault();
      });
    }

    if ($(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9']").length) {
      $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] .play-button").on("click", function (ev) {
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] h1, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] .article-media, .wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] .play-button").hide();
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] #iframing9.video-player").addClass('active');
        $(".wp-block-custom-ge-hero-video[data-ge-hero-video-instance-id = '9'] #iframing9.video-player").get(0).play();
        ev.preventDefault();
      });
    }

  });
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-hero-video-block.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-custom-block-spotlight.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {

  $(document).ready(function(){

    // Get count of slides
    $('.custom-block-ge-spotlight .slider-items').on('init reinit', function(event, slick){
      if (slick.slideCount > 0 && !isNaN(slick.slideCount)) {
        var slideMargin = parseInt($(slick.$slides[0]).css('margin-right'));
        var slideTotalWidth = slick.$slides[0].clientWidth + slideMargin;
        var slidesWidth = (slideTotalWidth * slick.slideCount) - slideMargin;

        //check if total width of slides is less than the slider window
        if (slidesWidth < slick.$slider[0].clientWidth ) {
          $('.custom-block-ge-spotlight div.carousel-control').addClass("control-hidden");
        }
        else {
          $('.custom-block-ge-spotlight div.carousel-control').removeClass("control-hidden");
        }
      }      
    });
    
    $('.custom-block-ge-spotlight .slider-items').slick({
      speed: 300,
      //slidesToShow: 4.5,
      //slidesToScroll: 1,
      //slidesToShow: 6,
      //slidesToScroll: 1,
      
      prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
      nextArrow: '.custom-block-ge-spotlight .ctrl-next',
      
      infinite: false,
      mobileFirst: true,
      rows: 1,
      variableWidth: true,
      
      responsive: [{
          breakpoint: 2560, //mf min(1200)
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 2460, //mf min(1200)
          settings: {
            slidesToShow: 5.8,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 2334, //mf min(1200)
          settings: {
            slidesToShow: 5.5,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 2084, //mf min(1200)
          settings: {
            slidesToShow: 4.75,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {             
          breakpoint: 1860, //mf min(1200)
          settings: {
            slidesToShow: 4.6,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 1820, //mf min(1200)
          settings: {
            slidesToShow: 4.5,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 1500, //mf min(1200)
          settings: {
            slidesToShow: 4.4,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 1366, //mf min(1200)
          settings: {
            slidesToShow: 4.3,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {        
          breakpoint: 1200, //mf min(1200)
          settings: {
            slidesToShow: 3.09,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {
          breakpoint: 1024, //mf min(1200)
          settings: {
            slidesToShow: 2.7,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {
          breakpoint: 992,  //mf min(992)
          settings: {
            slidesToShow: 2.4,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {
          breakpoint: 768, //mf min(768)
          settings: {
            slidesToShow: 2.3,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {
          breakpoint: 576,  //mf min(576)
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        }, {          
          breakpoint: 320,  //mf min(320)
          settings: {
            slidesToShow: 1.2,
            slidesToScroll: 1,
            rows: 1,
            prevArrow: '.custom-block-ge-spotlight .ctrl-prev',  
            nextArrow: '.custom-block-ge-spotlight .ctrl-next',
            variableWidth: true,
          },
        },
        
        
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]              
    });    
  });

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-custom-block-spotlight.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-licensing.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {

  $(document).ready(function(){

    $("a.wp-block-button__link:contains('CONTACT LICENSING TEAM')").parent(".wp-block-button.primary").on("click", function() {
      openNav();
    });  
    
    /* Set the width of the side navigation */
    function openNav() {
      $("#stickySidenav").addClass("active");
    }

    /* Set the width of the side navigation to 0 */
    function closeNav() {
      $("#stickySidenav").removeClass("active");
    }
				//Add Iframe id and alter iframe src and data-src
		if($('.licensing-video').length) {
			$('.licensing-video iframe').attr('id','licensing-yt');
			var frameurl_orig = $('.wp-block-embed__wrapper').find('iframe#licensing-yt').attr('src');
			if(frameurl_orig != undefined) {
				var processedUrl = frameurl_orig.replace('?rel=0','') + "?enablejsapi=1";
				$('.licensing-video iframe').attr('src',processedUrl);
				$('.licensing-video iframe').attr('data-src',processedUrl);
			
				//Iframe on click function
				//$('.wp-block-embed__wrapper iframe#licensing-yt').iframeTracker({
					//blurCallback: function(){
						// Do something when iframe is clicked (like firing an XHR request)
						var frameurl = $('.wp-block-embed__wrapper').find('iframe#licensing-yt').attr('src');
						loadPlayer(frameurl);
					//}
				//});
			}
			// Youtube Video percentage calc, Video progress, status tracking  
			var player; var timer; var timeSpent = []; 
			var timer25; var timer50; var timer75; 
			var timestamp; var timestamp25; var timestamp50; var timestamp75;
			var remainingTime; var remainingTime25; var remainingTime50; var remainingTime75;
			var vidduration; var currentTime; var ytTitle;
			function loadPlayer(frameurl) {
				if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
					var tag = document.createElement('script');
					tag.src = "https://www.youtube.com/iframe_api";
					var firstScriptTag = document.getElementsByTagName('script')[0];
					firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  		  
					window.onYouTubePlayerAPIReady = function() {
						onYouTubePlayer(frameurl);
					};
				} else {		
					clearTimers();								  	
					onYouTubePlayer(frameurl);			
				}
			}

			function onYouTubePlayer(frameurl) {
				if($('#licensing-yt').length) {
					var yturl = $('#licensing-yt').attr('src');
					var ytid = matchYoutubeUrl(yturl);
					player = new YT.Player('licensing-yt', {
						videoId: ytid,			  
						events: {
							'onReady': onPlayerReady,	
							'onStateChange': onPlayerStateChange,			 
						}
					});
				}
			}

			function matchYoutubeUrl(url){
				var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
				return (url.match(p)) ? RegExp.$1 : false ;
			}

			function onPlayerReady(event) { 
				//event.target.playVideo();
			}

			function onPlayerStateChange(event) {
				var frameid = player.id;
				if(ytTitle == undefined) {
					ytTitle = player.playerInfo.videoData['title'];
				}
				if (event.data == 1) {          		   
					if (typeof player.getDuration === "function"){
						vidduration = player.getDuration() ? player.getDuration() : player.playerInfo.duration;
					} else {		
						vidduration = player.playerInfo.duration;
					}
					timestamp = Math.floor(vidduration);
					timestamp25 = timestamp * 0.25;
					timestamp50 = timestamp * 0.5;
					timestamp75 = timestamp * 0.75;
					if (typeof player.getCurrentTime === "function"){
						currentTime = player.getCurrentTime() ? player.getCurrentTime() : player.playerInfo.currentTime;
					} else {
						currentTime = player.playerInfo.currentTime;
					}
					remainingTime = timestamp - currentTime;
					remainingTime25 = timestamp25 - currentTime;
					remainingTime50 = timestamp50 - currentTime;
					remainingTime75 = timestamp75 - currentTime;
					videoanalytics('Progress',frameid);
					record(frameid);
				}else if (event.data == 2) {
					videoanalytics('Paused',frameid);			  			
				}else if (event.data == 0) {
					videoanalytics('Complete',frameid);			
				}else if (event.data == 3) {
					videoanalytics('Buffering',frameid);			
				}else {
					videoanalytics('Not started',frameid);
				}
			}

			// Track the video watched percentage
			function record(frameid){
				if (currentTime <= timestamp25) {
					timer25 = setTimeout(function() {           	 
						percentagewatched('25%',frameid);
					}, remainingTime25 * 1000);		      	 
				}
				if (currentTime <= timestamp50) {
					timer50 = setTimeout(function() {
						percentagewatched('50%',frameid);
					}, remainingTime50 * 1000);
				}
				if (currentTime <= timestamp75) {
					timer75 = setTimeout(function() {
						percentagewatched('75%',frameid);
					}, remainingTime75 * 1000);
				}
			}

			// Clearing the timers 
			function clearTimers() {
				clearTimeout(timer);
				clearTimeout(timer25);
				clearTimeout(timer50);
				clearTimeout(timer75);
				timestamp=0;
				timestamp25=0;
				timestamp50=0;
				timestamp75=0;
			}

			// GTM Tracking for video status - progress, pause, complete  
			function videoanalytics(videostatus,frameid) {
				if($('#licensing-yt').length) {
					var videotitles = ytTitle;
					var videoURLs = $('#licensing-yt').attr('src');
				}
				if(videotitles != undefined) {
					var stripedtitle = videotitles.replace(/<[^>]+>/g, '');
					$.trim(stripedtitle);
					dataLayer.push({
						'event': 'videoPlay',
						'eventCategory': 'content',
						'eventAction': 'video engagement',
						'videoProvider': 'Youtube',
						'videoStatus': videostatus,
						'videoURL': videoURLs,
						'videoTitle': stripedtitle
					});
				}
			}

			// GTM Tracking for video played percentage   
			function percentagewatched(videoPercent,frameid) {

				if($('#licensing-yt').length) { 
					var videotitles = ytTitle;
					var videoURLs = $('#licensing-yt').attr('src');
				}
				if(videotitles != undefined) {
					var stripedtitle = videotitles.replace(/<[^>]+>/g, '');
					$.trim(stripedtitle);
					dataLayer.push({
						'event': 'videoPlay',
						'eventCategory': 'content',
						'eventAction': 'video engagement',
						'videoProvider': 'Youtube',
						'videoPercent': videoPercent, 
						'videoURL': videoURLs,
						'videoTitle': stripedtitle 		
					});
				}
			}
		}
		if($('#stickySidenav.ge-salesforce').length > 0) {
			$( "#salesform" ).submit(function(event) {
				dataLayer.push({
					'event': "formSubmit",
					'eventCategory': "forms",
					'eventAction': "contact us form interaction",
					'eventLabel': "successful form submit",
					'formName': "GE - Licensing Contact us",
					'formMessage': "Thank you"
				});
			});
		}
  });

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-licensing.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-rss-feeds.js. */
// Place your frontend scripts here

//import $ from "jquery";
// Import Slick
//import 'slick-carousel/slick/slick.min';
(function ($, Drupal) {
  
  document.addEventListener('DOMContentLoaded', function(event) {

    document.querySelectorAll("section.wp-block-custom-ge-rss-feeds").forEach(function(el) {
      var idx = el.getAttribute('data-ge-spotlight-instance-id');
      

      var section = document.querySelector("section.wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id='" + idx + "']");
      var rssEndpoint = section.getAttribute('data-feed-source');

      var rssFeedItems;
      
      // Using fetch to retrieve RSS Feeds
      fetch(rssEndpoint, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/rss+xml; charset=utf-8",
          "Accept": "application/rss+xml",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
        },   
      
      }).then( ( response ) => {
        if(!response.ok) {
          return;
        } 
        else {
          return response.text();  
        }
      }).then( ( text ) => {
        return text;  
      }).then( (data) => {
  
        var results = new DOMParser().parseFromString(data, "text/xml");
        var items = results.querySelectorAll("item");

        var rss_items = [];
        if (items.length) {
          items.forEach(function(el){
            var pubDate = el.querySelector("pubDate").innerHTML;
            var date = new Date(pubDate);
            var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var string = months[date.getMonth()]  + " " + date.getDate() + ", " + date.getFullYear();

            if(el.querySelector("enclosure")) {
              rss_items.push({
                "enclosure": el.querySelector("enclosure").getAttribute("url"),
                "title": el.querySelector("title").innerHTML,
                "link": el.querySelector("link").innerHTML,
			        	"pubDate": string,
               
              });
            } else {
              rss_items.push({
                "title": el.querySelector("title").innerHTML,
                "link": el.querySelector("link").innerHTML,
                "pubDate": string,
                //"tagname": el.querySelector("tagname").innerHTML,
                //"tagurl": el.querySelector("tagurl").innerHTML,
              });
            }
              
          });  
          
        }
        
        return rss_items;        
      }).then( (feed_items) => {
        
        var feeds_markup = '';
        
        if (feed_items.length) {
          feed_items.forEach( function(item) {
            
            if (item.enclosure) {
            
              feeds_markup +=         
              `<div class="wp-block-custom-ge-feature-card-image">
                <div class="card-container" style="background-color:var(--ge-dark-blue-grey);">                
                  <div class="card-feature"><img alt="General Electric" src="${ item.enclosure }" class="lazyloaded" loading="lazy" /></div>
                  <div class="card-stack" style="background-color:var(--ge-dark-blue-grey)">
                    <div class="card-title">
                      <p class="body-2" style="color:var(--ge-white);text-align:left"><a href="${ item.link }" rel="noopener noreferrer">${ item.title }</a></p>
                    </div>
                    <div class="card-cta">
                      <p class="call-to-action caption" style="color:var(--ge-white)">${ item.pubDate }</p>
                    </div>
                  </div>
                </div>
              </div>`;
              
            }
            else {

              feeds_markup +=         
              `<div class="wp-block-custom-ge-feature-card">
                <div class="card-container" style="background-color:var(--ge-primary-blue);">
                  <div class="card-stack">
                    <div class="card-title">
                      <h4 class="title" style="color:var(--ge-white);text-align:left"><a href="${ item.link }" rel="noopener noreferrer">${ item.title }</a></h4>
                    </div>
                    <div class="card-cta">
                      <p class="call-to-action caption" style="color:var(--ge-white)">${ item.pubDate }</p>
                    </div>
                  </div>
                </div>
              </div>`;          
              
            }                      
          
          });      
        }  

        document.querySelector("section.wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .slider-container-row .slider-items").innerHTML = feeds_markup;
              
      }).then( () => {
                  
        if ($(".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .slider-items").length) {
          
          // Get count of slides
          $(".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .slider-items").on("init reinit", function(event, slick){
            
            if (slick.slideCount > 0 && !isNaN(slick.slideCount)) {
              var slideMargin = parseInt($(slick.$slides[0]).css('margin-right'));
              var slideTotalWidth = slick.$slides[0].clientWidth + slideMargin;
              var slidesWidth = (slideTotalWidth * slick.slideCount) - slideMargin;

              //check if total width of slides is less than the slider window
              if (slidesWidth < slick.$slider[0].clientWidth ) {
                $(".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] div.carousel-control").addClass("control-hidden");
              }
              else {
                $(".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] div.carousel-control").removeClass("control-hidden");
              }        
            }
          });


          $(".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .slider-items").slick({
            speed: 300,
            slidesToShow: 3.25,
            slidesToScroll: 1,
            
            prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
            nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
            
            infinite: false,
            mobileFirst: true,
            rows: 1,
            variableWidth: true,
            
            responsive: [{
                breakpoint: 1200, //mf min(1200)
                settings: {
                  slidesToShow: 2.2,
                  slidesToScroll: 1,
                  rows: 1,
                  prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
                  nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
                  variableWidth: true,
                },
              }, {
                breakpoint: 992,  //mf min(992)
                settings: {
                  slidesToShow: 1.8,
                  slidesToScroll: 1,
                  rows: 1,
                  prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
                  nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
                  variableWidth: true,
                },
              }, {
                breakpoint: 767, //mf min(767)
                settings: {
                  slidesToShow: 1.6,
                  slidesToScroll: 1,
                  rows: 1,
                  prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
                  nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
                  variableWidth: true,
                },
              }, {
                breakpoint: 576,  //mf min(576)
                settings: {
                  slidesToShow: 1.5,
                  slidesToScroll: 1,
                  centerMode: true,
                  rows: 1,
                  prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
                  nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
                  variableWidth: true,
                },
              }, {          
                breakpoint: 300,  //mf min(320)
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  centerMode: true,
                  rows: 1,
                  prevArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-prev",  
                  nextArrow: ".wp-block-custom-ge-rss-feeds[data-ge-spotlight-instance-id = '" + idx + "'] .ctrl-next",
                  variableWidth: true,
                },
              },
              

              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]              
          }); 
          
        }
                  
      }).catch(err => console.log('error', err));   

      
    })
      

  });  
  
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-rss-feeds.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-content-left-right-image.js. */
// Place your frontend scripts here
(function ($, Drupal) {
     
        $(document).ready(function() {
          $(".wp-block-custom-ge-content-left-right-image[instance-id = '1'] .play-button").on('click', function(ev) { 
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '1'] #iframing").trigger('click');
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '1'] #iframing").addClass('active');
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '1'] #iframing")[0].src += "&autoplay=1";
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '1'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '1'] .play-button").hide();               
            ev.preventDefault();       
          });      
        });
        $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '2'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '2'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '2'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '2'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '2'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '2'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '3'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '3'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '3'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '3'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '3'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '3'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '4'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '4'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '4'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '4'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '4'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '4'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '5'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '5'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '5'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '5'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '5'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '5'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '6'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '6'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '6'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '6'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '6'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '6'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '7'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '7'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '7'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '7'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '7'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '7'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '8'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '8'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '8'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '8'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '8'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '8'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });  
          $(document).ready(function() {
            $(".wp-block-custom-ge-content-left-right-image[instance-id = '9'] .play-button").on('click', function(ev) { 
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '9'] #iframing").trigger('click');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '9'] #iframing").addClass('active');
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '9'] #iframing")[0].src += "&autoplay=1";
              $(".wp-block-custom-ge-content-left-right-image[instance-id = '9'] .customBackground, .wp-block-custom-ge-content-left-right-image[instance-id = '9'] .play-button").hide();               
              ev.preventDefault();       
            });      
          });
		  
})(jQuery, Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-content-left-right-image.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-tabs.js. */
window.addEventListener("load", function() {
  // store tabs variable
  var theTabs = document.querySelectorAll(".wp-block-custom-ge-tabs ul.nav-tabs > li");

  function theTabClicks(tabClickEvent) {
      var clickedTab = tabClickEvent.currentTarget;
      var tabParent = tabClickEvent.currentTarget.parentNode.parentNode.parentNode;
      var theTabs = tabParent.querySelectorAll(".wp-block-custom-ge-tabs ul.nav-tabs > li");
      for (var i = 0; i < theTabs.length; i++) {
          theTabs[i].classList.remove("active");
      }
      
      clickedTab.classList.add("active");
      tabClickEvent.preventDefault();
      var contentPanes = tabParent.querySelectorAll(".tab-pane");
      for (i = 0; i < contentPanes.length; i++) {
          contentPanes[i].classList.remove("active");
      }
      var anchorReference = tabClickEvent.target;
      var activePaneId = anchorReference.getAttribute("href");
      var activePane = tabParent.querySelector(activePaneId);
      activePane.classList.add("active");
  }
  for (i = 0; i < theTabs.length; i++) {
      theTabs[i].addEventListener("click", theTabClicks)
  }
});

(function ($, Drupal) {
// for video iframe
$(document).ready(function () {
  $('.wp-block-custom-ge-tab-contents-v1 .play-button').on('click', function (ev) {
    var iframeID = $(this).parents('.wp-block-custom-ge-tab-contents-v1').find('iframe').attr('id');
    $(".wp-block-custom-ge-tab-contents-v1 #"+ iframeID).addClass('active');
    // $(this).parents('.wp-block-custom-ge-tab-contents-v1').find('h1').hide();
    $(this).parents('.wp-block-custom-ge-tab-contents-v1').find('.play-button').hide();
    $(this).parents('.wp-block-custom-ge-tab-contents-v1').find('.customBackground').hide();    
    $(".wp-block-custom-ge-tab-contents-v1 #"+ iframeID)[0].src += "&autoplay=true";
    $(".wp-block-custom-ge-tab-contents-v1 #"+ iframeID).trigger('click');    
    ev.preventDefault();
  });
  
   //test video block
    $('.wp-block-custom-ge-tab-contents-v3 .play-button').on('click', function (ev) {
      var iframeVideoId = $(this).parents('.wp-block-custom-ge-tab-contents-v3').find('iframe').attr('id');
      $(".wp-block-custom-ge-tab-contents-v3 #"+ iframeVideoId).addClass('active');
      // $(this).parents('.wp-block-custom-ge-tab-contents-v3').find('.video-text-wrapper').hide();
      $(this).parents('.wp-block-custom-ge-tab-contents-v3').find('.play-button, .customBackground, .video-text-wrapper, .text-wrapper').hide();
      // $(this).parents('.wp-block-custom-ge-tab-contents-v3').find('.customBackground').hide();    
      $(".wp-block-custom-ge-tab-contents-v3 #"+ iframeVideoId)[0].src += "&autoplay=true";
      $(".wp-block-custom-ge-tab-contents-v3 #"+ iframeVideoId).trigger('click');     
      ev.preventDefault();
    });
});
//
})(jQuery, Drupal);


/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-tabs.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-ms-stream-video.js. */
// Video player
//import $ from 'jquery';
(function ($) {

  $(document).ready(function () {
    $('.wp-block-custom-ge-ms-stream-video .play-button').on('click', function (ev) {
      var iframeID = $(this).parents('.wp-block-custom-ge-ms-stream-video').find('iframe').attr('id');
      $(".wp-block-custom-ge-ms-stream-video #"+ iframeID).addClass('active');
      $(this).parents('.wp-block-custom-ge-ms-stream-video').find('h1').hide();
      $(".wp-block-custom-ge-ms-stream-video #"+ iframeID)[0].src += "&autoplay=true";
      $(".wp-block-custom-ge-ms-stream-video #"+ iframeID).trigger('click');
     
      
  
      // video traking
      var videoURLs = $('.wp-block-custom-ge-ms-stream-video .video-player #'+ iframeID).attr('src');
      var videotitles = $(this).parents('.wp-block-custom-ge-ms-stream-video').find('h1').html();
      var stripedtitle = videotitles.replace(/<[^>]+>/g, '');
      $.trim(stripedtitle);

      dataLayer.push({
        'event': 'videoPlay',
        'eventCategory': 'content',
        'eventAction': 'video engagement',
        'videoProvider': 'Youtube',
        'videoStatus': 'Open',
        'videoURL': videoURLs,
        'videoTitle': stripedtitle
      });

      ev.preventDefault();
    });
  });

})(jQuery);
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-ms-stream-video.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-body-container.js. */
// Accordion script for Link and Download Cards

var accordionTitle =  document.getElementsByClassName("accordion-title accordion-enable");
var accordionItem;

for (accordionItem = 0; accordionItem < accordionTitle.length; accordionItem++) {
  accordionTitle[accordionItem].addEventListener("click", function () {
    this.classList.toggle("active");
    var accordionPanel = this.nextElementSibling;
    if (this.classList.contains('active')) {
    accordionPanel.classList.add('open');
    } else {
    accordionPanel.classList.remove('open');
    }
  });
} 
/* Source and licensing information for the above line(s) can be found at https://www.ge.com/modules/custom/ge_gblox/js/ge-body-container.js. */;
