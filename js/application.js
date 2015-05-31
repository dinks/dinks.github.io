// Some general UI pack related JS
// Extend JS String with repeat method
String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
};

(function($) {

  // Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
      var segmentGap = 100 / (amount - 1) + "%",
          segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
      $(this).prepend(segment.repeat(amount - 2));
    });
  };

  $(function() {

    var gistContainer = $('#gists'), nextGist = false;

    if(!document._write) {
      document._write = document.write;
    }

    var accessGist = function (gistNumber) {
      if (gistNumber < 0) {
        document.write = document._write;
        return;
      }

      var data = Mustache.customData.gists[gistNumber];

      document.write = function (str) {
        var gistContainer = $('#gist-' + data.id);
        gistContainer.append(str);

        if (nextGist) {
          // Tags Input
          gistContainer.closest('.gist-container').find('.tagsinput').tagsInput();

          accessGist(gistNumber - 1);
        }
        // For a gist there are 2 document.writes
        // One for css
        // One for the actual gist
        // So we access the next gits only after 2 writes
        nextGist = !nextGist;
      };

      var output = Mustache.render(Mustache.templates.gist, data);
      gistContainer.append(output);
    };

    accessGist(Mustache.customData.gists.length - 1);

    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Custom Selects
    $("select[name='huge']").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='herolist']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='info']").selectpicker({style: 'btn-info'});

    // Tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // jQuery UI Sliders
    var $slider = $("#slider");
    if ($slider.length) {
      $slider.slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min"
      }).addSliderSegments($slider.slider("option").max);
    }

    // Placeholders for input/textarea
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").on('click', function() {
      $(this).parent().siblings("li").removeClass("active").end().addClass("active");
    });

    $(".btn-group a").on('click', function() {
      $(this).siblings().removeClass("active").end().addClass("active");
    });

    // Disable link clicks to prevent page scrolling
    $('a[href="#fakelink"]').on('click', function (e) {
      e.preventDefault();
    });

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

  });

})(jQuery);

// Mustache templates and DATA
Mustache.customData = {};
// Place newer gists at the end of the list
Mustache.customData.gists = [
  { id: 'df5b2f480c6941434529',
    title: 'Device Platform',
    url: 'https://gist.github.com/dinks/df5b2f480c6941434529.js',
    tags: ['rails', 'ruby', 'device']
  },
  { id: '4134824',
    title: 'Bootstrap Topbar List',
    url: 'https://gist.github.com/dinks/4134824.js',
    tags: ['rails', 'ruby', 'bootstrap', 'simple-navigation']
  },
  { id: '4258438',
    title: 'Tire with Bonsai',
    url: 'https://gist.github.com/dinks/4258438.js',
    tags: ['rails', 'ruby', 'heroku', 'tire', 'bonsai']
  },
  { id: '4557471',
    title: 'Asset Inconsistencies',
    url: 'https://gist.github.com/dinks/4557471.js',
    tags: ['rails', 'irb', 'scss', 'ruby']
  },
  { id: '6671930',
    title: 'Healthy',
    url: 'https://gist.github.com/dinks/6671930.js',
    tags: ['rails', 'rack', 'ruby']
  },
  { id: '6672078',
    title: 'RVM with ruby_version',
    url: 'https://gist.github.com/dinks/6672078.js',
    tags: ['rvm', 'ruby', 'rbenv']
  },
  { id: '6689596',
    title: 'Ruby Threads',
    url: 'https://gist.github.com/dinks/6689596.js',
    tags: ['ruby', 'threads']
  },
  { id: '6700860',
    title: 'Autoformatting in VIM',
    url: 'https://gist.github.com/dinks/6700860.js',
    tags: ['vim']
  },
  { id: '6712229',
    title: 'Anagram',
    url: 'https://gist.github.com/dinks/6712229.js',
    tags: ['ruby', 'anagram']
  },
  { id: '6961041',
    title: 'Fibanocci with the Golden Ratio',
    url: 'https://gist.github.com/dinks/6961041.js',
    tags: ['ruby', 'fibanocci', 'goldenratio']
  },
  { id: '6962262',
    title: 'Get Elements by Clazz',
    url: 'https://gist.github.com/dinks/6962262.js',
    tags: ['javascript']
  },
  { id: '7091208',
    title: 'Flip Clock',
    url: 'https://gist.github.com/dinks/7091208.js',
    tags: ['javascript', 'css', 'html']
  },
  { id: '7134126',
    title: 'Combined Enumerator',
    url: 'https://gist.github.com/dinks/7134126.js',
    tags: ['ruby']
  },
  { id: '448a641adbef6aec35ee',
    title: 'OpsWorks',
    url: 'https://gist.github.com/dinks/448a641adbef6aec35ee.js',
    tags: ['ruby', 'amazon', 'opsworks']
  },
  { id: '7141533',
    title: 'Rails with Mavericks',
    url: 'https://gist.github.com/dinks/7141533.js',
    tags: ['rails', 'ruby', 'mavericks']
  },
  { id: '7279379',
    title: 'instance_eval, instance_exec, class var',
    url: 'https://gist.github.com/dinks/7279379.js',
    tags: ['ruby']
  },
  { id: '7284178',
    title: 'Hash Blacklist and Whitelist',
    url: 'https://gist.github.com/dinks/7284178.js',
    tags: ['ruby']
  },
  { id: '7301370',
    title: 'Unserialize With Encoding Monkey Patch',
    url: 'https://gist.github.com/dinks/7301370.js',
    tags: ['rails', 'ruby']
  },
  { id: '7400662',
    title: 'SSH Autocomplete',
    url: 'https://gist.github.com/dinks/7400662.js',
    tags: ['bash', 'ssh']
  },
  { id: '7470089',
    title: 'OpenShift for Rails 4 Logging',
    url: 'https://gist.github.com/dinks/7470089.js',
    tags: ['rails', 'openshift', 'log']
  },
  { id: '7567702',
    title: 'NullObject',
    url: 'https://gist.github.com/dinks/7567702.js',
    tags: ['ruby']
  },
  { id: '7675570',
    title: 'Apache+Unicorn',
    url: 'https://gist.github.com/dinks/7675570.js',
    tags: ['apache', 'unicorn']
  },
  { id: '7751631',
    title: 'Define Singleton Method',
    url: 'https://gist.github.com/dinks/7751631.js',
    tags: ['ruby']
  },
  { id: '7876559',
    title: 'Openssl Install Ruby 2.0.0',
    url: 'https://gist.github.com/dinks/7876559.js',
    tags: ['ruby', 'openssl']
  },
  { id: '7925415',
    title: 'Access Files from Gem',
    url: 'https://gist.github.com/dinks/7925415.js',
    tags: ['ruby', 'gem']
  },
  { id: '8053496',
    title: 'Bundle without certain groups',
    url: 'https://gist.github.com/dinks/8053496.js',
    tags: ['ruby', 'gem', 'bundle']
  },
  { id: '8208469',
    title: 'Amazon Stuff',
    url: 'https://gist.github.com/dinks/8208469.js',
    tags: ['amazon']
  },
  { id: '8236058',
    title: 'Update bundler for Ruby 2.1.0 as minitest fails to install',
    url: 'https://gist.github.com/dinks/8236058.js',
    tags: ['travis', 'bundle', 'ruby']
  },
  { id: '8255108',
    title: 'Reload for FactoryGirl in Spring',
    url: 'https://gist.github.com/dinks/8255108.js',
    tags: ['ruby', 'factory-girl', 'spring']
  },
  { id: '8281825',
    title: 'When Reviewing',
    url: 'https://gist.github.com/dinks/8281825.js',
    tags: ['review']
  },
  { id: '8446517',
    title: 'ISP Bad',
    url: 'https://gist.github.com/dinks/8446517.js',
    tags: ['bash']
  },
  { id: '8623158',
    title: 'Capybara Links',
    url: 'https://gist.github.com/dinks/8623158.js',
    tags: ['rails', 'ruby', 'capybara']
  },
  { id: '8898546',
    title: 'Rescue from',
    url: 'https://gist.github.com/dinks/8898546.js',
    tags: ['rails', 'ruby']
  },
  {
    id: 'eaf5b521ca465cef45c8',
    title: 'Better I18n Mocks',
    url: 'https://gist.github.com/dinks/eaf5b521ca465cef45c8.js',
    tags: ['ruby', 'I18n']
  },
  {
    id: 'd37af17cbe612096541a',
    title: 'Robot User Agents',
    url: 'https://gist.github.com/dinks/d37af17cbe612096541a.js',
    tags: ['ruby', 'user-agent', 'robots']
  },
  {
    id: 'b135d3e3087c1b982004',
    title: 'Spotlight Index Worker',
    url: 'https://gist.github.com/dinks/b135d3e3087c1b982004.js',
    tags: ['mds', 'spotlight', 'index']
  },
  {
    id: 'e861c869a85579fc5559',
    title: 'Module Exports How',
    url: 'https://gist.github.com/dinks/e861c869a85579fc5559.js',
    tags: ['module', 'exports', 'nodejs']
  },
  {
    id: '911d30d2be93322ff062',
    title: 'Parasitic Combination Inheritance Pattern',
    url: 'https://gist.github.com/dinks/911d30d2be93322ff062.js',
    tags: ['pcip', 'inheritance', 'javascript']
  },
  {
    id: '809313a28ca30735b8bc',
    title: 'Eval Gotcha',
    url: 'https://gist.github.com/dinks/809313a28ca30735b8bc.js',
    tags: ['eval', 'javascript']
  },
  {
    id: '701a599a85b0b8450413',
    title: 'JavaScript WAT',
    url: 'https://gist.github.com/dinks/701a599a85b0b8450413.js',
    tags: ['wat', 'javascript']
  },
  {
    id: 'a724ad6816ab924b03e3',
    title: 'Promise Patterns',
    url: 'https://gist.github.com/dinks/a724ad6816ab924b03e3.js',
    tags: ['promise', 'javascript', 'patterns']
  },
  {
    id: '99b1c80cd3677a15c14b',
    title: 'Rspec Hearts Formatter',
    url: 'https://gist.github.com/dinks/99b1c80cd3677a15c14b.js',
    tags: ['rspec', 'formatter', 'ruby']
  },
  {
    id: '8a1ed1ee14e5fc6209e5',
    title: 'Prepend versus Include',
    url: 'https://gist.github.com/dinks/8a1ed1ee14e5fc6209e5.js',
    tags: ['ruby']
  },,
  {
    id: '6962dee675f54ebe7390',
    title: 'Mutable Objects as Hash Keys',
    url: 'https://gist.github.com/dinks/6962dee675f54ebe7390.js',
    tags: ['ruby', 'gotcha']
  },
  {
    id: '66dab4b89d5f2d6269ab',
    title: 'Test Middleware in Rails',
    url: 'https://gist.github.com/dinks/66dab4b89d5f2d6269ab.js',
    tags: ['rspec', 'middleware', 'rails', 'ruby']
  }
];

Mustache.templates = {
  gist: '<div class="gist-container"><h5 class="gist-title"><span class="fui-check-inverted"></span>{{title}}</h5><input name="tagsinput" class="tagsinput" value="{{#tags}}{{.}},{{/tags}}" style="display: none;"><div class="row"><div class="col-md-12"><small id="gist-{{id}}"><script src="{{{url}}}"></script></small></div></div></div>'
};

