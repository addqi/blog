System.register("chunks:///_virtual/AppRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './HomePage.ts', './GamePage.ts', './MyWorksPage.ts', './ToolState.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Material, SpriteFrame, view, UITransform, Node, Sprite, Color, Widget, Component, GameConfig, HomePage, GamePage, MyWorksPage, ToolState;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      SpriteFrame = module.SpriteFrame;
      view = module.view;
      UITransform = module.UITransform;
      Node = module.Node;
      Sprite = module.Sprite;
      Color = module.Color;
      Widget = module.Widget;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      HomePage = module.HomePage;
    }, function (module) {
      GamePage = module.GamePage;
    }, function (module) {
      MyWorksPage = module.MyWorksPage;
    }, function (module) {
      ToolState = module.ToolState;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "082c0K7RhRMPJef4jl3JNIN", "AppRoot", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * 场景唯一入口 — 总管理器。
       * 持有编辑器拖入的共享资源，创建并管理 HomePage / GamePage / MyWorksPage。
       */
      var AppRoot = exports('AppRoot', (_dec = ccclass('AppRoot'), _dec2 = property({
        type: Material,
        displayName: 'Digit 材质'
      }), _dec3 = property({
        type: SpriteFrame,
        displayName: '调色块底图'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AppRoot, _Component);
        function AppRoot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /* ── 编辑器引用（只保留必须拖入的资源） ── */
          _initializerDefineProperty(_this, "digitMaterial", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "paletteItemSprite", _descriptor2, _assertThisInitialized(_this));
          /* ── 页面引用 ── */
          _this._homeNode = null;
          _this._gameNode = null;
          _this._myWorksNode = null;
          _this._homePage = null;
          _this._gamePage = null;
          _this._myWorksPage = null;
          _this._toolState = null;
          return _this;
        }
        var _proto = AppRoot.prototype;
        _proto.start = function start() {
          var vs = view.getVisibleSize();
          var rootUt = this.node.getComponent(UITransform);
          if (rootUt) rootUt.setContentSize(vs.width, vs.height);
          this._toolState = new ToolState();
          this._createBackground(vs);
          this._createPages(vs);
          this.showHome();
        }

        /* ── 页面切换 ── */;
        _proto.showHome = function showHome() {
          this._gamePage.cleanup();
          this._homeNode.active = true;
          this._gameNode.active = false;
          this._homePage.refreshList();
        };
        _proto.showGame = function showGame(entry) {
          this._homeNode.active = false;
          this._gameNode.active = true;
          this._gamePage.startLevel(entry);
        };
        _proto.showMyWorks = function showMyWorks() {
          this._myWorksPage.show();
        };
        _proto._onMyWorksDismissed = function _onMyWorksDismissed() {
          this._homePage.refreshList();
        }

        /* ── 内部构建 ── */;
        _proto._createBackground = function _createBackground(vs) {
          var bg = new Node('Background');
          this.node.addChild(bg);
          var ut = bg.addComponent(UITransform);
          ut.setContentSize(vs.width, vs.height);
          var sp = bg.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.color = Color.WHITE;
          var w = bg.addComponent(Widget);
          w.isAlignTop = true;
          w.top = 0;
          w.isAlignBottom = true;
          w.bottom = 0;
          w.isAlignLeft = true;
          w.left = 0;
          w.isAlignRight = true;
          w.right = 0;
          w.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        };
        _proto._createPages = function _createPages(vs) {
          var _this2 = this;
          // HomePage
          this._homeNode = this._createPageNode('HomePage', vs);
          this._homePage = this._homeNode.addComponent(HomePage);
          this._homePage.init(function (entry) {
            return _this2.showGame(entry);
          }, function () {
            return _this2.showMyWorks();
          });

          // GamePage
          this._gameNode = this._createPageNode('GamePage', vs);
          this._gamePage = this._gameNode.addComponent(GamePage);
          this._gamePage.init(this._buildGameAssets(), this._toolState, function () {
            return _this2.showHome();
          });

          // MyWorksPage — standalone page, slides in from right
          this._myWorksNode = this._createPageNode('MyWorksPage', vs);
          this._myWorksPage = this._myWorksNode.addComponent(MyWorksPage);
          this._myWorksPage.init(function () {
            return _this2._onMyWorksDismissed();
          });
        };
        _proto._createPageNode = function _createPageNode(name, vs) {
          var node = new Node(name);
          this.node.addChild(node);
          var ut = node.addComponent(UITransform);
          ut.setContentSize(vs.width, vs.height);
          return node;
        };
        _proto._buildGameAssets = function _buildGameAssets() {
          var C = GameConfig;
          var hex = function hex(v) {
            return new Color(v >> 16 & 0xff, v >> 8 & 0xff, v & 0xff, 255);
          };
          return {
            digitMaterial: this.digitMaterial,
            paletteItemSprite: this.paletteItemSprite,
            cellDisplaySize: C.defaultCellDisplaySize,
            paletteStyle: {
              itemWidth: C.paletteItemWidth,
              itemHeight: C.paletteItemHeight,
              itemSpacing: C.paletteItemSpacing,
              padding: C.palettePadding,
              labelFontSize: C.paletteLabelFontSize,
              ringColor: hex(C.paletteRingColor),
              ringOutset: C.paletteRingOutset,
              itemRootOutset: C.paletteItemRootOutset,
              useContrastLabel: C.paletteUseContrastLabel,
              labelFixedColor: hex(C.paletteLabelFixedColor),
              columnsPerPage: C.paletteColumnsPerPage,
              rowsPerPage: C.paletteRowsPerPage,
              swipeThreshold: C.paletteSwipeThreshold,
              snapSpeed: C.paletteSnapSpeed,
              defaultPage: C.paletteDefaultPage
            }
          };
        };
        return AppRoot;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "digitMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "paletteItemSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardBootstrap.ts", ['cc', './GameConfig.ts', './BoardData.ts', './BrushState.ts', './PaintExecutor.ts', './CellConverter.ts', './BrushLayer.ts', './DigitLayer.ts', './BoardLayer.ts', './BoardRuntimeContext.ts', './ViewportController.ts', './PaintSaveManager.ts', './PaintRestore.ts'], function (exports) {
  var cclegacy, Sprite, Node, UITransform, view, GameConfig, BoardData, BrushState, PaintExecutor, CellConverter, BrushLayer, DigitLayer, BoardLayer, BoardRuntimeContext, ViewportController, PaintSaveManager, PaintRestore;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Node = module.Node;
      UITransform = module.UITransform;
      view = module.view;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      BoardData = module.BoardData;
    }, function (module) {
      BrushState = module.BrushState;
    }, function (module) {
      PaintExecutor = module.PaintExecutor;
    }, function (module) {
      CellConverter = module.CellConverter;
    }, function (module) {
      BrushLayer = module.BrushLayer;
    }, function (module) {
      DigitLayer = module.DigitLayer;
    }, function (module) {
      BoardLayer = module.BoardLayer;
    }, function (module) {
      BoardRuntimeContext = module.BoardRuntimeContext;
    }, function (module) {
      ViewportController = module.ViewportController;
    }, function (module) {
      PaintSaveManager = module.PaintSaveManager;
    }, function (module) {
      PaintRestore = module.PaintRestore;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a540b/U6QxDuojm28FPLY9I", "BoardBootstrap", undefined);
      /** 建 Content → Board → Digit → Brush，接视口缩放 */
      var BoardBootstrap = exports('BoardBootstrap', /*#__PURE__*/function () {
        function BoardBootstrap() {}
        BoardBootstrap.run = function run(p) {
          var cols = p.puzzle.gridSize;
          var rows = p.puzzle.gridSize;
          var cell = p.cellDisplaySize;
          var bw = cols * cell;
          var bh = rows * cell;
          var oldSprite = p.boardRoot.getComponent(Sprite);
          if (oldSprite) {
            oldSprite.destroy();
          }
          var boardData = new BoardData(p.puzzle);
          var brushState = new BrushState();
          brushState.palette = boardData.palette;
          brushState.currentIndex = 0;
          var content = new Node('BoardContent');
          p.boardRoot.addChild(content);
          var cUt = content.addComponent(UITransform);
          cUt.setContentSize(bw, bh);
          var boardLayer = new BoardLayer(content, boardData, cell, cell);
          var digitLayer = new DigitLayer(content, boardData, p.digitMaterial, cell, cell);
          var brushLayer = new BrushLayer(content, cols, rows, cell, cell);
          var paintExecutor = new PaintExecutor(brushLayer.pixelBuffer, null, digitLayer.pixelBuffer, boardData, brushState);
          var cellConverter = new CellConverter(cols, rows, cell, cell);
          var saveManager = new PaintSaveManager(p.levelId, boardData);
          var vs = view.getVisibleSize();
          var fitMin = Math.min(vs.width / bw, vs.height / bh) * GameConfig.viewportAutoFitScreenRatio;
          var vmin = Math.min(vs.width, vs.height);
          var k = GameConfig.viewportMaxZoomVisibleCells;
          var maxByCells = vmin / (k * cell);
          var minScale = fitMin;
          var maxScale = Math.max(maxByCells, minScale);
          var ctx;
          var viewport = new ViewportController(content, {
            minScale: minScale,
            maxScale: maxScale,
            zoomStep: p.viewport.zoomStep,
            zoomSpeedPerSecond: p.viewport.zoomSpeedPerSecond,
            autoFitInitial: p.viewport.autoFitInitial,
            boardWidthPx: bw,
            boardHeightPx: bh,
            viewportPadding: GameConfig.viewportPadding,
            onScaleChanged: function onScaleChanged() {
              ctx.refreshDetailVisibility();
            }
          });
          p.toolState.resetActive();
          ctx = new BoardRuntimeContext({
            boardRoot: p.boardRoot,
            contentNode: content,
            cellDisplayW: cell,
            cellDisplayH: cell,
            boardData: boardData,
            brushState: brushState,
            boardLayer: boardLayer,
            brushLayer: brushLayer,
            digitLayer: digitLayer,
            cellConverter: cellConverter,
            paintExecutor: paintExecutor,
            viewport: viewport,
            saveManager: saveManager,
            toolState: p.toolState
          });
          PaintRestore.restore(ctx);
          ctx.refreshDetailVisibility();
          return ctx;
        };
        return BoardBootstrap;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardData.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "81260DLL+9FGrPNefuM9Owf", "BoardData", undefined);
      /**
       * 盘面数据
       */
      var BoardData = exports('BoardData', /*#__PURE__*/function () {
        function BoardData(puzzleData) {
          /** 网格列数 */
          this.gridCols = void 0;
          /** 网格行数 */
          this.gridRows = void 0;
          /** 调色板 hex 颜色数组 */
          this.palette = void 0;
          /** 每格的正确颜色编号 */
          this.cellData = void 0;
          this.gridCols = puzzleData.gridSize;
          this.gridRows = puzzleData.gridSize;
          this.palette = puzzleData.palette;
          var flat = BoardData.rleDecode(puzzleData.pixels);
          var total = this.gridCols * this.gridRows;
          this.cellData = new Int8Array(total);
          for (var i = 0; i < total; i++) {
            this.cellData[i] = i < flat.length ? flat[i] : -1;
          }
        }

        /** 获取某格的正确颜色编号, -1=空格 */
        var _proto = BoardData.prototype;
        _proto.getBrushIndex = function getBrushIndex(row, col) {
          return this.cellData[row * this.gridCols + col];
        }
        /** 某格是否为空格（不需要涂色） */;
        _proto.isEmpty = function isEmpty(row, col) {
          return this.cellData[row * this.gridCols + col] < 0;
        }
        /** RLE 解码："-1:8,3,0:3" → [-1,-1,-1,-1,-1,-1,-1,-1,3,0,0,0] */;
        BoardData.rleDecode = function rleDecode(encoded) {
          if (!encoded) return [];
          var result = [];
          var parts = encoded.split(',');
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            var colonIdx = part.indexOf(':');
            if (colonIdx === -1) {
              // 纯数字，如 "3"
              result.push(parseInt(part, 10));
            } else {
              // 值:次数，如 "-1:8"
              var value = parseInt(part.substring(0, colonIdx), 10);
              var count = parseInt(part.substring(colonIdx + 1), 10);
              for (var j = 0; j < count; j++) {
                result.push(value);
              }
            }
          }
          return result;
        }
        /** hex 颜色 → 灰度值 (给底图用的, 后面 Phase 5 才会用到) */;
        BoardData.hexToGray = function hexToGray(hex) {
          var r = parseInt(hex.slice(1, 3), 16);
          var g = parseInt(hex.slice(3, 5), 16);
          var b = parseInt(hex.slice(5, 7), 16);
          return Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
        };
        return BoardData;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardLayer.ts", ['cc', './BoardData.ts', './PixelBuffer.ts', './ZoomFadeMath.ts'], function (exports) {
  var cclegacy, Texture2D, Node, UITransform, Sprite, SpriteFrame, BoardData, PixelBuffer, nonSelectedBoardFadeAlpha;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Texture2D = module.Texture2D;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      BoardData = module.BoardData;
    }, function (module) {
      PixelBuffer = module.PixelBuffer;
    }, function (module) {
      nonSelectedBoardFadeAlpha = module.nonSelectedBoardFadeAlpha;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9684euhMZNII4Pmh7OW5ro4", "BoardLayer", undefined);

      /** Board 灰度底图；缩放时按 G15_FBase_ZoomFadeLogic 向 boardFadeColor / 选中格目标色渐变 */
      var BoardLayer = exports('BoardLayer', /*#__PURE__*/function () {
        function BoardLayer(parent, boardData, cellDisplayW, cellDisplayH) {
          this.pixelBuffer = void 0;
          this.node = void 0;
          this._texture = void 0;
          this._boardData = void 0;
          /** 每格 3 字节 RGB，仅 idx>=0 的格有效 */
          this._baseRgb = void 0;
          this._lastQuantizedAlpha = -1;
          this._lastBrushIndex = -2;
          this._boardData = boardData;
          var cols = boardData.gridCols;
          var rows = boardData.gridRows;
          this.pixelBuffer = new PixelBuffer(cols, rows);
          this._baseRgb = new Uint8Array(cols * rows * 3);
          for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
              var idx = boardData.getBrushIndex(r, c);
              var flat = (r * cols + c) * 3;
              if (idx < 0) {
                this.pixelBuffer.setPixel(r, c, 238, 238, 238, 255);
              } else {
                var _boardData$palette$id;
                var hex = (_boardData$palette$id = boardData.palette[idx]) != null ? _boardData$palette$id : '#888888';
                if (!hex.startsWith('#')) hex = "#" + hex;
                var g = BoardData.hexToGray(hex);
                var v = Math.round(90 + g / 255 * 110);
                this.pixelBuffer.setPixel(r, c, v, v, v, 255);
                this._baseRgb[flat] = v;
                this._baseRgb[flat + 1] = v;
                this._baseRgb[flat + 2] = v;
              }
            }
          }
          this._texture = new Texture2D();
          this._texture.reset({
            width: cols,
            height: rows,
            format: Texture2D.PixelFormat.RGBA8888
          });
          this._texture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
          this.node = new Node('Board');
          parent.addChild(this.node);
          var ut = this.node.addComponent(UITransform);
          ut.setContentSize(cols * cellDisplayW, rows * cellDisplayH);
          var sp = this.node.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.type = Sprite.Type.SIMPLE;
          var sf = new SpriteFrame();
          sf.texture = this._texture;
          sp.spriteFrame = sf;
        }

        /**
         * G15 ZoomFade 盘面像素更新；digit 层用 rawAlpha，此处用量化 alpha。
         * @returns 是否执行了纹理上传
         */
        var _proto = BoardLayer.prototype;
        _proto.applyZoomFade = function applyZoomFade(brushIndex, quantizedAlpha, alphaSteps, fadeR, fadeG, fadeB, selR, selG, selB, selFadeR, selFadeG, selFadeB) {
          if (quantizedAlpha === this._lastQuantizedAlpha && brushIndex === this._lastBrushIndex) {
            return false;
          }
          this._lastQuantizedAlpha = quantizedAlpha;
          this._lastBrushIndex = brushIndex;
          var cols = this._boardData.gridCols;
          var rows = this._boardData.gridRows;
          var alpha = quantizedAlpha;
          var nonSelAlpha = nonSelectedBoardFadeAlpha(alpha, alphaSteps);
          for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
              var idx = this._boardData.getBrushIndex(r, c);
              if (idx < 0) continue;
              var flat = (r * cols + c) * 3;
              var gray = this._baseRgb[flat];
              if (idx === brushIndex) {
                this.pixelBuffer.setPixel(r, c, selR + (selFadeR - selR) * alpha + 0.5 | 0, selG + (selFadeG - selG) * alpha + 0.5 | 0, selB + (selFadeB - selB) * alpha + 0.5 | 0, 255);
              } else {
                this.pixelBuffer.setPixel(r, c, gray + (fadeR - gray) * nonSelAlpha + 0.5 | 0, gray + (fadeG - gray) * nonSelAlpha + 0.5 | 0, gray + (fadeB - gray) * nonSelAlpha + 0.5 | 0, 255);
              }
            }
          }
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
          return true;
        };
        _proto.flush = function flush() {
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
        };
        return BoardLayer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardRootPanInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Vec2, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec2 = module.Vec2;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "b2e8cnwOh1LfpwvGo5NbJsK", "BoardRootPanInput", undefined);
      var ccclass = _decorator.ccclass;

      /**
       * 挂在 boardRoot：仅当触点未命中子节点（盘面小于屏幕时的留白）时引擎会把事件派到本节点，此时单指拖动为平移视口。
       * 落在 Brush 上的触点仍由 BoardTouchInput 处理（涂色 / 双指捏合）。
       */
      var BoardRootPanInput = exports('BoardRootPanInput', (_dec = ccclass('BoardRootPanInput'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardRootPanInput, _Component);
        function BoardRootPanInput() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._ctx = null;
          _this._prevUi = null;
          return _this;
        }
        var _proto = BoardRootPanInput.prototype;
        _proto.init = function init(ctx) {
          this._unbind();
          this._ctx = ctx;
          this.node.on(Node.EventType.TOUCH_START, this._onStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onMove, this);
          this.node.on(Node.EventType.TOUCH_END, this._onEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onEnd, this);
        };
        _proto.onDestroy = function onDestroy() {
          this._unbind();
        };
        _proto._unbind = function _unbind() {
          this.node.off(Node.EventType.TOUCH_START, this._onStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this._onMove, this);
          this.node.off(Node.EventType.TOUCH_END, this._onEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._onEnd, this);
        };
        _proto._onStart = function _onStart(e) {
          var g = e.getTouches();
          if (g && g.length === 1) {
            var loc = e.getUILocation();
            this._prevUi = new Vec2(loc.x, loc.y);
          } else {
            this._prevUi = null;
          }
        };
        _proto._onMove = function _onMove(e) {
          var ctx = this._ctx;
          if (!ctx || !this._prevUi) return;
          var g = e.getTouches();
          if (!g || g.length !== 1) return;
          var cur = e.getUILocation();
          var dx = cur.x - this._prevUi.x;
          var dy = cur.y - this._prevUi.y;
          this._prevUi.set(cur.x, cur.y);
          ctx.viewport.panBy(dx, dy);
        };
        _proto._onEnd = function _onEnd() {
          this._prevUi = null;
        };
        return BoardRootPanInput;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardRuntimeContext.ts", ['cc', './GameConfig.ts', './ZoomFadeMath.ts', './MagnifierEffect.ts'], function (exports) {
  var cclegacy, GameConfig, smoothstep, quantizeZoomFadeAlpha, MagnifierEffect;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      smoothstep = module.smoothstep;
      quantizeZoomFadeAlpha = module.quantizeZoomFadeAlpha;
    }, function (module) {
      MagnifierEffect = module.MagnifierEffect;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a1eb46jyANHeKw2X7yhBXcH", "BoardRuntimeContext", undefined);
      var BoardRuntimeContext = exports('BoardRuntimeContext', /*#__PURE__*/function () {
        function BoardRuntimeContext(params) {
          this.boardRoot = void 0;
          this.contentNode = void 0;
          this.cellDisplayW = void 0;
          this.cellDisplayH = void 0;
          this.boardData = void 0;
          this.brushState = void 0;
          this.boardLayer = void 0;
          this.brushLayer = void 0;
          this.digitLayer = void 0;
          this.cellConverter = void 0;
          this.paintExecutor = void 0;
          this.viewport = void 0;
          this.saveManager = void 0;
          this.toolState = void 0;
          this.magnifierEffect = void 0;
          this.onToast = null;
          this.boardRoot = params.boardRoot;
          this.contentNode = params.contentNode;
          this.cellDisplayW = params.cellDisplayW;
          this.cellDisplayH = params.cellDisplayH;
          this.boardData = params.boardData;
          this.brushState = params.brushState;
          this.boardLayer = params.boardLayer;
          this.brushLayer = params.brushLayer;
          this.digitLayer = params.digitLayer;
          this.cellConverter = params.cellConverter;
          this.paintExecutor = params.paintExecutor;
          this.viewport = params.viewport;
          this.saveManager = params.saveManager;
          this.toolState = params.toolState;
          this.magnifierEffect = new MagnifierEffect();
        }

        /**
         * G15 ZoomFade 语义 + pxielArt 量纲：对 zoom 归一化 t=(scale-min)/(max-min) 做 smoothstep；
         * Digit 层 rawAlpha；Board 用量化 alpha 做底色 lerp。
         */
        var _proto = BoardRuntimeContext.prototype;
        _proto.refreshDetailVisibility = function refreshDetailVisibility() {
          var scale = this.viewport.scale;
          var minS = this.viewport.minScale;
          var maxS = this.viewport.maxScale;
          var span = maxS - minS;
          var rawAlpha;
          if (span < 1e-8) {
            rawAlpha = 1;
          } else {
            var t = (scale - minS) / span;
            var lowT = GameConfig.viewportDetailSmoothLowT;
            var highT = Math.max(lowT + 1e-4, GameConfig.viewportDetailSmoothHighT);
            rawAlpha = smoothstep(lowT, highT, t);
          }
          var steps = GameConfig.viewportZoomFadeAlphaSteps;
          var qAlpha = quantizeZoomFadeAlpha(rawAlpha, steps);
          this.digitLayer.setDetailOpacity(rawAlpha);
          var f = GameConfig.boardFadeColor;
          var s0 = GameConfig.selectedCellColor;
          var s1 = GameConfig.selectedCellFadeColor;
          this.boardLayer.applyZoomFade(this.brushState.currentIndex, qAlpha, steps, f >> 16 & 0xff, f >> 8 & 0xff, f & 0xff, s0 >> 16 & 0xff, s0 >> 8 & 0xff, s0 & 0xff, s1 >> 16 & 0xff, s1 >> 8 & 0xff, s1 & 0xff);
        };
        _proto.flushPaintLayers = function flushPaintLayers() {
          var ex = this.paintExecutor;
          if (ex.brushDirty) {
            this.brushLayer.flush();
          }
          if (ex.digitDirty) {
            this.digitLayer.flush();
          }
          ex.resetDirty();
        };
        return BoardRuntimeContext;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardTouchInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './ToolConfig.ts', './ToolExecutor.ts', './PaintSnapRules.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, UITransform, Vec3, Vec2, Component, GameConfig, ToolType, ToolExecutor, cellHitAllowsDraw, cellFilled, collectPaintCellsDDA, filterPaintPathToBrush, PaintSnapSession;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      ToolType = module.ToolType;
    }, function (module) {
      ToolExecutor = module.ToolExecutor;
    }, function (module) {
      cellHitAllowsDraw = module.cellHitAllowsDraw;
      cellFilled = module.cellFilled;
      collectPaintCellsDDA = module.collectPaintCellsDDA;
      filterPaintPathToBrush = module.filterPaintPathToBrush;
      PaintSnapSession = module.PaintSnapSession;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "2f847RvJvRKJacX7+bwCCGa", "BoardTouchInput", undefined);
      var ccclass = _decorator.ccclass;
      function btLog() {
        var _console;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_console = console).log.apply(_console, ['[BoardTouch]'].concat(args));
      }

      /**
       * 涂色 / 视口手势 — 对齐 G15_FBase：
       * - TouchStart：CellHitTest（吸附 + 未填 + 笔号对）→ 绘制模式；否则平移模式。
       * - TouchMove：绘制模式 → DDA 收集 + 路径过滤 + PaintLogic；平移模式 → moved 过阈值后 ViewportDrag。
       * - TouchEnd：点按可上半透明（非匹配格），见 TouchEndPaintRouteLogic。
       * - 双指：捏合 + 中点平移。
       */
      var BoardTouchInput = exports('BoardTouchInput', (_dec = ccclass('BoardTouchInput'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardTouchInput, _Component);
        function BoardTouchInput() {
          var _this;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._ctx = null;
          _this._activeTouchIds = new Set();
          _this._snapSession = new PaintSnapSession();
          _this._pending = [];
          /** 对齐 G15 rt.hited：touchstart 时是否进入绘制模式 */
          _this._drawMode = false;
          _this._moved = false;
          _this._paintStarted = false;
          _this._hasLastPaintPos = false;
          _this._lastPaintX = 0;
          _this._lastPaintY = 0;
          _this._gestureStartUi = new Vec2();
          _this._panPrevUi = null;
          _this._pinchSession = false;
          _this._pinchPrevMid = null;
          _this._pinchPrevDist = 0;
          return _this;
        }
        var _proto = BoardTouchInput.prototype;
        _proto.init = function init(ctx) {
          this._unbind();
          this._ctx = ctx;
          this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        };
        _proto.onDestroy = function onDestroy() {
          this._unbind();
        };
        _proto._unbind = function _unbind() {
          this.node.off(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this._onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        };
        _proto._uiToBoardRoot = function _uiToBoardRoot(ui) {
          var ctx = this._ctx;
          var ut = ctx.boardRoot.getComponent(UITransform);
          var local = ut.convertToNodeSpaceAR(new Vec3(ui.x, ui.y, 0));
          return new Vec2(local.x, local.y);
        };
        _proto._brushLocalFromTouch = function _brushLocalFromTouch(t) {
          var ut = this.node.getComponent(UITransform);
          var loc = t.getUILocation();
          var l = ut.convertToNodeSpaceAR(new Vec3(loc.x, loc.y, 0));
          return new Vec2(l.x, l.y);
        };
        _proto._cellFromTouch = function _cellFromTouch(t) {
          var ctx = this._ctx;
          if (!ctx) return null;
          var l = this._brushLocalFromTouch(t);
          return ctx.cellConverter.pointerToCell(l.x, l.y, 0, 0, 1);
        };
        _proto._touchInsideBrush = function _touchInsideBrush(t) {
          var ut = this.node.getComponent(UITransform);
          if (!ut) return false;
          var l = this._brushLocalFromTouch(t);
          var hw = ut.width * 0.5;
          var hh = ut.height * 0.5;
          return l.x >= -hw && l.x <= hw && l.y >= -hh && l.y <= hh;
        };
        _proto._brushTouches = function _brushTouches(list) {
          var out = [];
          for (var i = 0; i < list.length; i++) {
            if (this._touchInsideBrush(list[i])) out.push(list[i]);
          }
          return out;
        };
        _proto._touchList = function _touchList(event) {
          var g = event.getTouches();
          return g && g.length > 0 ? g : event.touch ? [event.touch] : [];
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          var ctx = this._ctx;
          if (!ctx) return;
          var t = event.touch;
          if (t) this._activeTouchIds.add(t.getID());
          var list = this._touchList(event);
          if (this._pinchSession) {
            var active = this._getActiveTouches(list);
            if (active.length >= 2) this._resetPinchBaseline(active);
            return;
          }
          var bt = this._brushTouches(list);
          if (bt.length >= 2) {
            btLog('TOUCH_START → 分支: 双指捏合');
            this._pinchSession = true;
            this._snapSession.reset();
            this._resetPaintGesture();
            ctx.paintExecutor.clearEntries();
            ctx.viewport.cancelSnap();
            this._resetPinchBaseline(bt);
            return;
          }
          if (bt.length === 1) {
            ctx.viewport.cancelSnap();
            ctx.paintExecutor.clearEntries();
            this._snapSession.reset();
            this._paintStarted = false;
            this._hasLastPaintPos = false;
            this._moved = false;
            var loc = this._brushLocalFromTouch(bt[0]);
            var brushIdx = ctx.brushState.currentIndex;
            var scale = ctx.viewport.scale;
            var cols = ctx.boardData.gridCols;
            var rows = ctx.boardData.gridRows;
            var cw = ctx.cellDisplayW;
            var ch = ctx.cellDisplayH;
            var snapPos = this._snapSession.snap(loc.x, loc.y, scale, brushIdx, cols, rows, cw, ch, ctx.boardData, ctx.brushLayer.pixelBuffer, GameConfig.correctCellExpandPx, false);
            this._drawMode = cellHitAllowsDraw(snapPos, ctx.boardData, ctx.brushLayer.pixelBuffer, brushIdx);
            var ui = bt[0].getUILocation();
            this._gestureStartUi.set(ui.x, ui.y);
            this._panPrevUi = new Vec2(ui.x, ui.y);
            if (this._drawMode) {
              this._lastPaintX = loc.x;
              this._lastPaintY = loc.y;
              this._hasLastPaintPos = true;
            }
            var rawCell = ctx.cellConverter.pointerToCell(loc.x, loc.y, 0, 0, 1);
            btLog('TOUCH_START → 分支: 单指 | drawMode=', this._drawMode, '(绘制)', '| snapPos=', snapPos, '| rawCell=', rawCell, '| UI=', ui.x.toFixed(0), ui.y.toFixed(0));
          }
        };
        _proto._resetPaintGesture = function _resetPaintGesture() {
          this._drawMode = false;
          this._moved = false;
          this._paintStarted = false;
          this._hasLastPaintPos = false;
          this._panPrevUi = null;
        };
        _proto._onTouchMove = function _onTouchMove(event) {
          var ctx = this._ctx;
          if (!ctx) return;
          var list = this._touchList(event);
          if (this._pinchSession) {
            var active = this._getActiveTouches(list);
            if (active.length >= 2) this._handlePinchMove(active[0], active[1], ctx);
            return;
          }
          var bt = this._brushTouches(list);
          if (bt.length >= 2) {
            btLog('TOUCH_MOVE → 双指进入捏合');
            this._pinchSession = true;
            this._snapSession.reset();
            this._resetPaintGesture();
            ctx.paintExecutor.clearEntries();
            ctx.viewport.cancelSnap();
            this._handlePinchMove(bt[0], bt[1], ctx);
            return;
          }
          if (bt.length !== 1) {
            btLog('TOUCH_MOVE → 忽略: brush 上有效触点数=', bt.length, '(非 1)');
            return;
          }
          var thr = GameConfig.moveThreshold;
          var curUi = bt[0].getUILocation();
          var ox = curUi.x - this._gestureStartUi.x;
          var oy = curUi.y - this._gestureStartUi.y;
          if (!this._drawMode) {
            btLog('TOUCH_MOVE → 分支: 平移模式(drawMode=false) | UI=', curUi.x.toFixed(0), curUi.y.toFixed(0), '| 相对起点 dx,dy=', ox.toFixed(1), oy.toFixed(1), '| threshold=', thr, '| _moved=', this._moved);
            if (!this._panPrevUi) this._panPrevUi = new Vec2(curUi.x, curUi.y);
            if (!this._moved) {
              if (Math.abs(ox) < thr && Math.abs(oy) < thr) {
                btLog('TOUCH_MOVE → 平移: 未过阈值，等待滑动');
                this._panPrevUi.set(curUi.x, curUi.y);
                return;
              }
              this._moved = true;
              btLog('TOUCH_MOVE → 平移: 已过阈值，开始跟手移动');
            }
            var dx = curUi.x - this._panPrevUi.x;
            var dy = curUi.y - this._panPrevUi.y;
            var cx = ctx.contentNode;
            var bx = cx.position.x;
            var by = cx.position.y;
            btLog('TOUCH_MOVE → 平移: 移动前 Content 本地坐标 position=', "(" + bx.toFixed(2) + ", " + by.toFixed(2) + ")", '| 本帧 delta UI=', "(" + dx.toFixed(2) + ", " + dy.toFixed(2) + ")");
            ctx.viewport.panBy(dx, dy);
            this._panPrevUi.set(curUi.x, curUi.y);
            btLog('TOUCH_MOVE → 平移: 移动后 Content 本地坐标 position=', "(" + cx.position.x.toFixed(2) + ", " + cx.position.y.toFixed(2) + ")");
            return;
          }
          btLog('TOUCH_MOVE → 分支: 绘制模式(drawMode=true) | UI=', curUi.x.toFixed(0), curUi.y.toFixed(0));
          if (!this._moved) {
            if (Math.abs(ox) < thr && Math.abs(oy) < thr) {
              btLog('TOUCH_MOVE → 绘制: 未过绘制阈值，跳过');
              return;
            }
            this._moved = true;
            btLog('TOUCH_MOVE → 绘制: 已过阈值');
          }
          var loc = this._brushLocalFromTouch(bt[0]);
          var rawCell = ctx.cellConverter.pointerToCell(loc.x, loc.y, 0, 0, 1);
          if (!rawCell || cellFilled(ctx.boardData, ctx.brushLayer.pixelBuffer, rawCell.row, rawCell.col)) {
            btLog('TOUCH_MOVE → 绘制: 提前 return | rawCell=', rawCell, '| reason=', !rawCell ? '无格(null)' : 'cellFilled(空格或已填)');
            return;
          }
          var brushIdx = ctx.brushState.currentIndex;
          var scale = ctx.viewport.scale;
          var cols = ctx.boardData.gridCols;
          var rows = ctx.boardData.gridRows;
          var cw = ctx.cellDisplayW;
          var ch = ctx.cellDisplayH;
          var snapPos = this._snapSession.snap(loc.x, loc.y, scale, brushIdx, cols, rows, cw, ch, ctx.boardData, ctx.brushLayer.pixelBuffer, GameConfig.correctCellExpandPx, this._paintStarted);
          if (!snapPos) {
            btLog('TOUCH_MOVE → 绘制: 提前 return | snap()=null');
            return;
          }
          collectPaintCellsDDA(this._hasLastPaintPos, this._lastPaintX, this._lastPaintY, loc.x, loc.y, brushIdx, cols, rows, cw, ch, ctx.boardData, ctx.brushLayer.pixelBuffer, this._pending);
          this._lastPaintX = loc.x;
          this._lastPaintY = loc.y;
          this._hasLastPaintPos = true;
          var hasTarget = false;
          for (var i = 0; i < this._pending.length; i++) {
            if (this._pending[i].row === snapPos.row && this._pending[i].col === snapPos.col) {
              hasTarget = true;
              break;
            }
          }
          if (!hasTarget) {
            this._pending.push({
              row: snapPos.row,
              col: snapPos.col,
              brushIndex: brushIdx
            });
          }
          filterPaintPathToBrush(this._pending, snapPos, ctx.boardData, brushIdx);
          if (this._pending.length === 0) {
            btLog('TOUCH_MOVE → 绘制: 提前 return | filter 后 pending 为空');
            return;
          }
          btLog('TOUCH_MOVE → 绘制: paintCells 数量=', this._pending.length, 'snapPos=', snapPos);
          ctx.paintExecutor.paintCells(this._pending);
          ctx.flushPaintLayers();
          this._paintStarted = true;
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {
          var ctx = this._ctx;
          if (!ctx) return;
          var t = event.touch;
          if (t) this._activeTouchIds["delete"](t.getID());
          if (this._pinchSession) {
            if (this._activeTouchIds.size >= 2) {
              var list = this._touchList(event);
              var active = this._getActiveTouches(list);
              if (active.length >= 2) this._resetPinchBaseline(active);
              return;
            }
            ctx.viewport.snapBack();
            this._pinchSession = false;
            this._resetPinchBaseline(null);
            this._resetPaintGesture();
            this._snapSession.reset();
            return;
          }
          if (this._activeTouchIds.size > 0) return;
          if (!this._moved && t) {
            if (this._tryExecuteTool(ctx, t)) {
              this._resetPaintGesture();
              this._snapSession.reset();
              return;
            }
            var loc = this._brushLocalFromTouch(t);
            var brushIdx = ctx.brushState.currentIndex;
            var scale = ctx.viewport.scale;
            var cols = ctx.boardData.gridCols;
            var rows = ctx.boardData.gridRows;
            var cw = ctx.cellDisplayW;
            var ch = ctx.cellDisplayH;
            var snapPos = this._snapSession.snap(loc.x, loc.y, scale, brushIdx, cols, rows, cw, ch, ctx.boardData, ctx.brushLayer.pixelBuffer, GameConfig.correctCellExpandPx, this._paintStarted);
            var pos = snapPos;
            if (!pos) pos = this._cellFromTouch(t);
            if (pos && !cellFilled(ctx.boardData, ctx.brushLayer.pixelBuffer, pos.row, pos.col)) {
              ctx.paintExecutor.paintCells([{
                row: pos.row,
                col: pos.col,
                brushIndex: brushIdx
              }]);
              ctx.flushPaintLayers();
            }
          }
          ctx.saveManager.commitMatchedEntries(ctx.paintExecutor.entries, ctx.boardData.gridCols);
          this._resetPaintGesture();
          this._snapSession.reset();
        };
        _proto._onTouchCancel = function _onTouchCancel(event) {
          this._onTouchEnd(event);
        };
        _proto._getActiveTouches = function _getActiveTouches(list) {
          var out = [];
          for (var i = 0; i < list.length; i++) {
            if (this._activeTouchIds.has(list[i].getID())) out.push(list[i]);
          }
          return out;
        };
        _proto._handlePinchMove = function _handlePinchMove(t0, t1, ctx) {
          var l0 = t0.getUILocation();
          var l1 = t1.getUILocation();
          var midUi = new Vec2((l0.x + l1.x) * 0.5, (l0.y + l1.y) * 0.5);
          var dist = Vec2.distance(l0, l1);
          var midRoot = this._uiToBoardRoot(midUi);
          if (!this._pinchPrevMid || this._pinchPrevDist < 1e-4) {
            this._pinchPrevMid = midRoot.clone();
            this._pinchPrevDist = dist;
            return;
          }
          ctx.viewport.applyPinchPanStep(this._pinchPrevDist, dist, this._pinchPrevMid, midRoot);
          this._pinchPrevMid = midRoot;
          this._pinchPrevDist = dist;
        };
        _proto._resetPinchBaseline = function _resetPinchBaseline(twoTouches) {
          if (!twoTouches || twoTouches.length < 2) {
            this._pinchPrevMid = null;
            this._pinchPrevDist = 0;
            return;
          }
          var l0 = twoTouches[0].getUILocation();
          var l1 = twoTouches[1].getUILocation();
          var midUi = new Vec2((l0.x + l1.x) * 0.5, (l0.y + l1.y) * 0.5);
          this._pinchPrevMid = this._uiToBoardRoot(midUi);
          this._pinchPrevDist = Vec2.distance(l0, l1);
        };
        _proto._tryExecuteTool = function _tryExecuteTool(ctx, t) {
          var ts = ctx.toolState;
          var activeType = ts.activeType;
          if (activeType === ToolType.None) return false;
          var cell = this._cellFromTouch(t);
          if (!cell) {
            ts.deactivate();
            return true;
          }
          var isFilled = function isFilled(r, c) {
            return cellFilled(ctx.boardData, ctx.brushLayer.pixelBuffer, r, c);
          };
          var pending = [];
          if (activeType === ToolType.MagicWand) {
            pending = ToolExecutor.magicWand(cell.row, cell.col, ctx.boardData, isFilled);
          } else if (activeType === ToolType.Bomb) {
            pending = ToolExecutor.bomb(cell.row, cell.col, ctx.boardData, isFilled);
          }
          if (pending.length > 0) {
            ts.consume(activeType);
            ctx.paintExecutor.paintCells(pending);
            ctx.flushPaintLayers();
            ctx.saveManager.commitMatchedEntries(ctx.paintExecutor.entries, ctx.boardData.gridCols);
          } else {
            ctx.onToast == null || ctx.onToast('该区域已涂完');
          }
          ts.deactivate();
          return true;
        };
        return BoardTouchInput;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardViewportInput.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, input, Input, KeyCode, Component, GameConfig;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "acfbcYknqhFrpYd+mAsxS3T", "BoardViewportInput", undefined);
      var ccclass = _decorator.ccclass;

      /**
       * 键盘视口：按住 W/S 或 ↑/↓ 连续缩放；H J K L 平移。
       * 触摸逻辑在 BoardTouchInput：点在「色号不对/空格」上拖 = 平移盘面；点在「当前笔号与答案一致」格上拖 = 滑动画笔（与根节点留白平移互补）。
       */
      var BoardViewportInput = exports('BoardViewportInput', (_dec = ccclass('BoardViewportInput'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardViewportInput, _Component);
        function BoardViewportInput() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._ctx = null;
          /** +1 放大 / -1 缩小 / 0 无 */
          _this._zoomDir = 0;
          _this._panX = 0;
          _this._panY = 0;
          return _this;
        }
        var _proto = BoardViewportInput.prototype;
        _proto.init = function init(ctx) {
          input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
          this._ctx = ctx;
          input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto.update = function update(dt) {
          var ctx = this._ctx;
          if (!ctx || dt <= 0) return;
          if (ctx.magnifierEffect.active) {
            ctx.magnifierEffect.tick(dt, ctx);
            return;
          }
          if (ctx.viewport.tickSnapBack(dt)) return;
          var speed = GameConfig.viewportArrowPanSpeed;
          if (this._panX !== 0 || this._panY !== 0) {
            ctx.viewport.panBy(this._panX * speed * dt, this._panY * speed * dt);
          }
          if (this._zoomDir !== 0) {
            ctx.viewport.zoomContinuous(dt, this._zoomDir);
          }
        };
        _proto._onKeyDown = function _onKeyDown(e) {
          var k = e.keyCode;
          if (k === KeyCode.KEY_W || k === KeyCode.ARROW_UP) {
            this._zoomDir = 1;
          } else if (k === KeyCode.KEY_S || k === KeyCode.ARROW_DOWN) {
            this._zoomDir = -1;
          } else if (k === KeyCode.KEY_H) {
            this._panX = -1;
          } else if (k === KeyCode.KEY_L) {
            this._panX = 1;
          } else if (k === KeyCode.KEY_K) {
            this._panY = 1;
          } else if (k === KeyCode.KEY_J) {
            this._panY = -1;
          }
        };
        _proto._onKeyUp = function _onKeyUp(e) {
          var k = e.keyCode;
          if (k === KeyCode.KEY_W || k === KeyCode.ARROW_UP) {
            if (this._zoomDir === 1) this._zoomDir = 0;
          } else if (k === KeyCode.KEY_S || k === KeyCode.ARROW_DOWN) {
            if (this._zoomDir === -1) this._zoomDir = 0;
          } else if (k === KeyCode.KEY_H) {
            if (this._panX === -1) this._panX = 0;
          } else if (k === KeyCode.KEY_L) {
            if (this._panX === 1) this._panX = 0;
          } else if (k === KeyCode.KEY_K) {
            if (this._panY === 1) this._panY = 0;
          } else if (k === KeyCode.KEY_J) {
            if (this._panY === -1) this._panY = 0;
          }
        };
        return BoardViewportInput;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BrushLayer.ts", ['cc', './PixelBuffer.ts'], function (exports) {
  var cclegacy, Texture2D, Node, UITransform, Sprite, SpriteFrame, Button, PixelBuffer;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Texture2D = module.Texture2D;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Button = module.Button;
    }, function (module) {
      PixelBuffer = module.PixelBuffer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a80f6UVgTZJUIlYgLZvPepH", "BrushLayer", undefined);

      /** Brush 层：最上层子节点；初始全透明以露出灰底，涂色后盖住数字 */
      var BrushLayer = exports('BrushLayer', /*#__PURE__*/function () {
        function BrushLayer(parent, gridCols, gridRows, cellDisplayW, cellDisplayH) {
          this.pixelBuffer = void 0;
          this.node = void 0;
          this._texture = void 0;
          this.pixelBuffer = new PixelBuffer(gridCols, gridRows);
          this.pixelBuffer.fill(0, 0, 0, 0);
          this._texture = new Texture2D();
          this._texture.reset({
            width: gridCols,
            height: gridRows,
            format: Texture2D.PixelFormat.RGBA8888
          });
          this._texture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
          this.node = new Node('Brush');
          parent.addChild(this.node);
          var ut = this.node.addComponent(UITransform);
          ut.setContentSize(gridCols * cellDisplayW, gridRows * cellDisplayH);
          var sprite = this.node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.SIMPLE;
          var sf = new SpriteFrame();
          sf.texture = this._texture;
          sprite.spriteFrame = sf;

          // 全透明 Sprite 常无法命中；Button 按 UITransform 整块接收触摸
          var btn = this.node.addComponent(Button);
          btn.target = this.node;
          btn.transition = Button.Transition.NONE;
        }
        var _proto = BrushLayer.prototype;
        _proto.flush = function flush() {
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
        };
        return BrushLayer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BrushState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3d3d891lPlNVo8Z88AeIbDi", "BrushState", undefined);
      /**
       * 画笔状态
       */
      var BrushState = exports('BrushState', /*#__PURE__*/function () {
        function BrushState() {
          /** 当前选中的颜色编号（对应 palette 数组下标） */
          this.currentIndex = 0;
          /** 调色板引用（初始化时设置） */
          this.palette = [];
        }
        var _proto = BrushState.prototype;
        // BrushState.ts 加一个方法
        _proto.getRGB = function getRGB(index) {
          var _this$palette$index;
          var hexStr = (_this$palette$index = this.palette[index]) != null ? _this$palette$index : '#000000';
          var hex = parseInt(hexStr.slice(1), 16);
          return [hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff];
        }

        /** 当前颜色的 RGB 数值，如 [255, 0, 0] */;
        _createClass(BrushState, [{
          key: "currentColor",
          get: /** 当前颜色的 hex 字符串，如 '#ff0000' */
          function get() {
            var _this$palette$this$cu;
            return (_this$palette$this$cu = this.palette[this.currentIndex]) != null ? _this$palette$this$cu : '#000000';
          }
        }, {
          key: "currentRGB",
          get: function get() {
            return this.getRGB(this.currentIndex);
          }
        }]);
        return BrushState;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BundleManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, assetManager, JsonAsset;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
      JsonAsset = module.JsonAsset;
    }],
    execute: function () {
      cclegacy._RF.push({}, "43c00wQvudIJr330tGiBGr/", "BundleManager", undefined);
      var GAME_BUNDLE_NAME = 'game-bundle';
      /**
       * 游戏资源管理器
       */
      var BundleManager = exports('BundleManager', /*#__PURE__*/function () {
        function BundleManager() {}
        /**
         * 加载游戏资源包
         */
        BundleManager.load = function load(onProgress) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var url = _this._resolveBundlePath();
            assetManager.loadBundle(url, function (err, bundle) {
              if (err) return reject(err);
              _this._game = bundle;
              if (onProgress) {
                // TODO: 上线前删除 _loadDirSlowly，换回 preloadDir
                _this._loadDirSlowly(bundle, onProgress).then(resolve)["catch"](reject);
              } else {
                resolve();
              }
            });
          });
        }

        // TODO: 调试用，模拟慢速加载，上线前删除此方法
        ;

        BundleManager._loadDirSlowly = function _loadDirSlowly(bundle, onProgress) {
          return new Promise(function (resolve, reject) {
            var infos = bundle.getDirWithPath('/');
            var total = infos.length;
            var idx = 0;
            var next = function next() {
              if (idx >= total) {
                resolve();
                return;
              }
              var info = infos[idx];
              bundle.load(info.path, function (err) {
                if (err) {
                  reject(err);
                  return;
                }
                idx++;
                onProgress(idx, total);
                setTimeout(next, 200);
              });
            };
            next();
          });
        };
        BundleManager.loadPuzzle = function loadPuzzle(jsonPath) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.game.load(jsonPath, JsonAsset, function (err, asset) {
              if (err || !asset) return reject(err != null ? err : new Error('load failed'));
              resolve(asset);
            });
          });
        }
        /**
         * 解析游戏资源包路径
         */;
        BundleManager._resolveBundlePath = function _resolveBundlePath() {
          return GAME_BUNDLE_NAME;
        };
        _createClass(BundleManager, null, [{
          key: "game",
          get:
          /**
           * 获取游戏资源包
           */
          function get() {
            if (!this._game) throw new Error('game-bundle not loaded yet');
            return this._game;
          }

          /**
           * 游戏资源包是否已加载
           */
        }, {
          key: "isLoaded",
          get: function get() {
            return this._game !== null;
          }
        }]);
        return BundleManager;
      }());
      /**
       * 游戏资源包
       */
      BundleManager._game = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CellConverter.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b95eetPZXhLUaE+1A9Pt37W", "CellConverter", undefined);
      var CellConverter = exports('CellConverter', /*#__PURE__*/function () {
        /** 
         * @param gridCols 网格列数
         * @param gridRows 网格行数
         * @param cellWidth 每个格子在屏幕上的显示尺寸（像素）
         * @param cellHeight 每个格子在屏幕上的显示尺寸（像素）
         */
        function CellConverter(gridCols, gridRows, cellWidth, cellHeight) {
          /** 网格列数 */
          this._gridCols = void 0;
          /** 网格行数 */
          this._gridRows = void 0;
          /** 每个格子在屏幕上的显示尺寸（像素） */
          this._cellWidth = void 0;
          /** 每个格子在屏幕上的显示尺寸（像素） */
          this._cellHeight = void 0;
          /** 总宽度（像素） */
          this._totalWidth = void 0;
          /** 总高度（像素） */
          this._totalHeight = void 0;
          this._gridCols = gridCols;
          this._gridRows = gridRows;
          this._cellWidth = cellWidth;
          this._cellHeight = cellHeight;
          this._totalWidth = gridCols * cellWidth;
          this._totalHeight = gridRows * cellHeight;
        }
        /**
           * 屏幕触摸坐标 → 格子行列
           * @param localX   触摸点在内容节点的本地坐标 X
           * @param localY   触摸点在内容节点的本地坐标 Y
           * @param offsetX  内容偏移 X（Phase 2 阶段传 0）
           * @param offsetY  内容偏移 Y（Phase 2 阶段传 0）
           * @param scale    当前缩放值（Phase 2 阶段传 1）
           * @returns 格子位置，越界返回 null
           */
        var _proto = CellConverter.prototype;
        _proto.pointerToCell = function pointerToCell(localX, localY, offsetX, offsetY, scale) {
          var x = (localX - offsetX) / scale;
          var y = (localY - offsetY) / scale;
          var col = Math.floor((x + this._totalWidth / 2) / this._cellWidth);
          var row = this._gridRows - 1 - Math.floor((this._totalHeight / 2 - y) / this._cellHeight);
          if (col < 0 || col >= this._gridCols || row < 0 || row >= this._gridRows) return null;
          return {
            row: row,
            col: col
          };
        }

        /** 更新网格尺寸（切换关卡时调用） */;
        _proto.updateGridSize = function updateGridSize(cols, rows, cellWidth, cellHeight) {
          this._gridCols = cols;
          this._gridRows = rows;
          this._cellWidth = cellWidth;
          this._cellHeight = cellHeight;
          this._totalWidth = cols * this._cellWidth;
          this._totalHeight = rows * this._cellHeight;
        };
        return CellConverter;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CompletionPopup.ts", ['cc', './GameConfig.ts', './WhitePixel.ts', './ReplayAnimator.ts'], function (exports) {
  var cclegacy, Node, UITransform, Sprite, Color, Widget, Button, UIOpacity, Label, tween, Vec3, GameConfig, getWhitePixelSF, ReplayAnimator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Color = module.Color;
      Widget = module.Widget;
      Button = module.Button;
      UIOpacity = module.UIOpacity;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      getWhitePixelSF = module.getWhitePixelSF;
    }, function (module) {
      ReplayAnimator = module.ReplayAnimator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8cc2etPbMhNk6Dy3+Bi24Nb", "CompletionPopup", undefined);
      var CompletionPopup = exports('CompletionPopup', /*#__PURE__*/function () {
        function CompletionPopup() {}
        CompletionPopup.show = function show(parent, viewW, viewH, puzzle, history, onBack) {
          var sf = getWhitePixelSF();
          var C = GameConfig;
          var imgSize = Math.min(viewW, viewH) * C.settlementImageScale * 0.75;
          var CARD_PAD = 40;
          var TITLE_H = 70;
          var BTN_H = 70;
          var cardW = viewW * 0.85;
          var cardH = TITLE_H + CARD_PAD + imgSize + CARD_PAD + BTN_H + CARD_PAD;

          /* ── 根节点 ── */
          var root = new Node('CompletionRoot');
          parent.addChild(root);
          root.addComponent(UITransform).setContentSize(viewW, viewH);

          /* ── 半透明暗色遮罩（拦截输入） ── */
          var overlay = new Node('Overlay');
          root.addChild(overlay);
          overlay.addComponent(UITransform).setContentSize(viewW, viewH);
          var oSp = overlay.addComponent(Sprite);
          oSp.sizeMode = Sprite.SizeMode.CUSTOM;
          oSp.spriteFrame = sf;
          oSp.color = new Color(0, 0, 0, 128);
          var oW = overlay.addComponent(Widget);
          oW.isAlignTop = true;
          oW.top = 0;
          oW.isAlignBottom = true;
          oW.bottom = 0;
          oW.isAlignLeft = true;
          oW.left = 0;
          oW.isAlignRight = true;
          oW.right = 0;
          oW.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
          var blocker = overlay.addComponent(Button);
          blocker.target = overlay;
          blocker.transition = Button.Transition.NONE;
          var overlayOp = overlay.addComponent(UIOpacity);
          overlayOp.opacity = 0;

          /* ── 白色卡片 ── */
          var card = new Node('Card');
          root.addChild(card);
          card.addComponent(UITransform).setContentSize(cardW, cardH);
          var cardBg = new Node('CardBg');
          card.addChild(cardBg);
          cardBg.addComponent(UITransform).setContentSize(cardW, cardH);
          var bgSp = cardBg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = Color.WHITE;

          /* ── 标题（回放后 fade-in） ── */
          var titleY = cardH / 2 - TITLE_H / 2 - 10;
          var titleNode = new Node('Title');
          card.addChild(titleNode);
          titleNode.setPosition(0, titleY, 0);
          titleNode.addComponent(UITransform).setContentSize(cardW, TITLE_H);
          var titleLab = titleNode.addComponent(Label);
          titleLab.string = '恭喜完成!';
          titleLab.fontSize = 42;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(60, 60, 60, 255);
          var titleOp = titleNode.addComponent(UIOpacity);
          titleOp.opacity = 0;

          /* ── 回放画布 ── */
          var canvasY = titleY - TITLE_H / 2 - CARD_PAD - imgSize / 2 + 10;
          var canvasNode = new Node('ReplayCanvas');
          card.addChild(canvasNode);
          canvasNode.setPosition(0, canvasY, 0);
          canvasNode.addComponent(UITransform).setContentSize(imgSize, imgSize);
          var canvasSp = canvasNode.addComponent(Sprite);
          canvasSp.sizeMode = Sprite.SizeMode.CUSTOM;

          /* ── 按钮组（回放后 fade-in） ── */
          var btnY = -cardH / 2 + BTN_H / 2 + CARD_PAD;
          var btnGroup = new Node('BtnGroup');
          card.addChild(btnGroup);
          btnGroup.setPosition(0, btnY, 0);
          btnGroup.addComponent(UITransform).setContentSize(cardW, BTN_H);
          var btnGroupOp = btnGroup.addComponent(UIOpacity);
          btnGroupOp.opacity = 0;
          var animator = null;
          var showResults = function showResults() {
            tween(titleOp).delay(C.settlementActionFadeInDelay).to(C.settlementActionFadeInDur, {
              opacity: 255
            }).start();
            tween(btnGroupOp).delay(C.settlementActionFadeInDelay).to(C.settlementActionFadeInDur, {
              opacity: 255
            }).start();
          };
          var replayNode = this._createButton(sf, '再看一次', new Color(220, 220, 220, 255), new Color(60, 60, 60, 255));
          btnGroup.addChild(replayNode);
          replayNode.setPosition(-130, 0, 0);
          replayNode.getComponent(Button).node.on(Button.EventType.CLICK, function () {
            if (animator && !animator.playing) animator.play();
          });
          var backNode = this._createButton(sf, '返回首页', new Color(76, 175, 80, 255), Color.WHITE);
          btnGroup.addChild(backNode);
          backNode.setPosition(130, 0, 0);
          backNode.getComponent(Button).node.on(Button.EventType.CLICK, function () {
            return onBack();
          });

          /* ── 回放动画器 ── */
          animator = canvasNode.addComponent(ReplayAnimator);
          animator.setup(puzzle, history, canvasSp, showResults, C.settlementReplayDur);

          /* ── 进入动画：遮罩渐显 + 卡片 scale 弹入 → delay → 回放 ── */
          var cardOp = card.addComponent(UIOpacity);
          cardOp.opacity = 0;
          card.setScale(0.9, 0.9, 1);
          tween(overlayOp).to(C.settlementFadeInDur, {
            opacity: 255
          }).start();
          tween(cardOp).to(C.settlementFadeInDur, {
            opacity: 255
          }).start();
          tween(card).to(C.settlementFadeInDur, {
            scale: new Vec3(1, 1, 1)
          }).delay(C.settlementReplayStartDelay).call(function () {
            return animator.play();
          }).start();
        };
        CompletionPopup._createButton = function _createButton(sf, label, bgColor, textColor) {
          var node = new Node("Btn_" + label);
          node.addComponent(UITransform).setContentSize(200, 56);
          var sp = node.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.spriteFrame = sf;
          sp.color = bgColor;
          var labNode = new Node('Label');
          node.addChild(labNode);
          labNode.addComponent(UITransform).setContentSize(200, 56);
          var lab = labNode.addComponent(Label);
          lab.string = label;
          lab.fontSize = 26;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = textColor;
          var btn = node.addComponent(Button);
          btn.target = node;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.9;
          return node;
        };
        return CompletionPopup;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DigitLayer.ts", ['cc', './PixelBuffer.ts'], function (exports) {
  var cclegacy, Vec4, Texture2D, Node, UITransform, Sprite, SpriteFrame, Vec2, PixelBuffer;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec4 = module.Vec4;
      Texture2D = module.Texture2D;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Vec2 = module.Vec2;
    }, function (module) {
      PixelBuffer = module.PixelBuffer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "74702y7E9hAkoMm7+k59sSR", "DigitLayer", undefined);

      /** Digit 层：网格+数字同层；detailParams.x 为整层透明度（对齐 G15 digitComp.alpha） */
      var DigitLayer = exports('DigitLayer', /*#__PURE__*/function () {
        function DigitLayer(parent, boardData, digitMaterial, cellDisplayW, cellDisplayH) {
          this.pixelBuffer = void 0;
          this.node = void 0;
          this._texture = void 0;
          this._sprite = void 0;
          var cols = boardData.gridCols;
          var rows = boardData.gridRows;
          this.pixelBuffer = new PixelBuffer(cols, rows);
          for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
              var brushIndex = boardData.getBrushIndex(r, c);
              var digitVal = brushIndex >= 0 ? brushIndex + 1 : 0;
              this.pixelBuffer.setPixel(r, c, digitVal, 0, 0, 0);
            }
          }
          this._texture = new Texture2D();
          this._texture.reset({
            width: cols,
            height: rows,
            format: Texture2D.PixelFormat.RGBA8888
          });
          this._texture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
          this.node = new Node('Digit');
          parent.addChild(this.node);
          var ut = this.node.addComponent(UITransform);
          ut.setContentSize(cols * cellDisplayW, rows * cellDisplayH);
          this._sprite = this.node.addComponent(Sprite);
          this._sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this._sprite.type = Sprite.Type.SIMPLE;
          var sf = new SpriteFrame();
          sf.texture = this._texture;
          this._sprite.spriteFrame = sf;
          this._sprite.customMaterial = digitMaterial;
          var matInst = this._sprite.getMaterialInstance(0);
          matInst.setProperty('gridSize', new Vec2(cols, rows));
          matInst.setProperty('detailParams', new Vec4(0, 0, 0, 0));
        }

        /** 0~1：网格线与数字共用（G15 rawAlpha） */
        var _proto = DigitLayer.prototype;
        _proto.setDetailOpacity = function setDetailOpacity(opacity) {
          var matInst = this._sprite.getMaterialInstance(0);
          if (matInst) {
            matInst.setProperty('detailParams', new Vec4(opacity, 0, 0, 0));
          }
        };
        _proto.flush = function flush() {
          this._texture.uploadData(this.pixelBuffer.getFlippedData());
        };
        return DigitLayer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ExitConfirmPopup.ts", ['cc', './WhitePixel.ts'], function (exports) {
  var cclegacy, view, Node, UITransform, Sprite, Color, UIOpacity, Button, Label, tween, Vec3, getWhitePixelSF;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Color = module.Color;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      getWhitePixelSF = module.getWhitePixelSF;
    }],
    execute: function () {
      cclegacy._RF.push({}, "baf3amX7O5HirWfRAORGKaU", "ExitConfirmPopup", undefined);
      var CARD_W = 400;
      var CARD_H = 240;
      var BTN_W = 150;
      var BTN_H = 50;
      var ExitConfirmPopup = exports('ExitConfirmPopup', /*#__PURE__*/function () {
        function ExitConfirmPopup() {}
        ExitConfirmPopup.show = function show(parent, onContinue, onExit) {
          var vs = view.getVisibleSize();
          var sf = getWhitePixelSF();
          var root = new Node('ExitConfirm');
          parent.addChild(root);
          root.addComponent(UITransform).setContentSize(vs.width, vs.height);

          /* ── 半透明遮罩 ── */
          var overlay = new Node('Overlay');
          root.addChild(overlay);
          overlay.addComponent(UITransform).setContentSize(vs.width, vs.height);
          var oSp = overlay.addComponent(Sprite);
          oSp.sizeMode = Sprite.SizeMode.CUSTOM;
          oSp.spriteFrame = sf;
          oSp.color = new Color(0, 0, 0, 128);
          var overlayOp = overlay.addComponent(UIOpacity);
          overlayOp.opacity = 0;
          var oBtn = overlay.addComponent(Button);
          oBtn.target = overlay;
          oBtn.transition = Button.Transition.NONE;
          oBtn.node.on(Button.EventType.CLICK, function () {
            return dismiss(false);
          });

          /* ── 白色卡片 ── */
          var card = new Node('Card');
          root.addChild(card);
          card.addComponent(UITransform).setContentSize(CARD_W, CARD_H);
          var cardBg = new Node('Bg');
          card.addChild(cardBg);
          cardBg.addComponent(UITransform).setContentSize(CARD_W, CARD_H);
          var bgSp = cardBg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = Color.WHITE;

          /* ── 标题 ── */
          var titleNode = new Node('Title');
          card.addChild(titleNode);
          titleNode.setPosition(0, CARD_H / 2 - 50, 0);
          titleNode.addComponent(UITransform).setContentSize(CARD_W, 50);
          var titleLab = titleNode.addComponent(Label);
          titleLab.string = '确认退出？';
          titleLab.fontSize = 34;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(50, 50, 50, 255);

          /* ── 副标题 ── */
          var subNode = new Node('Subtitle');
          card.addChild(subNode);
          subNode.setPosition(0, CARD_H / 2 - 95, 0);
          subNode.addComponent(UITransform).setContentSize(CARD_W, 36);
          var subLab = subNode.addComponent(Label);
          subLab.string = '进度已自动保存';
          subLab.fontSize = 24;
          subLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          subLab.verticalAlign = Label.VerticalAlign.CENTER;
          subLab.color = new Color(140, 140, 140, 255);

          /* ── 按钮 ── */
          var continueBtn = this._btn(sf, '继续游戏', new Color(220, 220, 220, 255), new Color(60, 60, 60, 255));
          card.addChild(continueBtn);
          continueBtn.setPosition(-90, -CARD_H / 2 + BTN_H / 2 + 24, 0);
          continueBtn.getComponent(Button).node.on(Button.EventType.CLICK, function () {
            return dismiss(false);
          });
          var exitBtn = this._btn(sf, '退出', new Color(76, 175, 80, 255), Color.WHITE);
          card.addChild(exitBtn);
          exitBtn.setPosition(90, -CARD_H / 2 + BTN_H / 2 + 24, 0);
          exitBtn.getComponent(Button).node.on(Button.EventType.CLICK, function () {
            return dismiss(true);
          });

          /* ── 弹出动画 ── */
          var cardOp = card.addComponent(UIOpacity);
          cardOp.opacity = 0;
          card.setScale(0.85, 0.85, 1);
          tween(overlayOp).to(0.25, {
            opacity: 255
          }).start();
          tween(cardOp).to(0.25, {
            opacity: 255
          }).start();
          tween(card).to(0.25, {
            scale: new Vec3(1, 1, 1)
          }).start();

          /* ── 关闭逻辑 ── */
          var dismissing = false;
          var dismiss = function dismiss(exit) {
            if (dismissing) return;
            dismissing = true;
            tween(overlayOp).to(0.2, {
              opacity: 0
            }).start();
            tween(cardOp).to(0.2, {
              opacity: 0
            }).start();
            tween(card).to(0.2, {
              scale: new Vec3(0.85, 0.85, 1)
            }).call(function () {
              root.destroy();
              if (exit) onExit();else onContinue();
            }).start();
          };
        };
        ExitConfirmPopup._btn = function _btn(sf, label, bgColor, textColor) {
          var node = new Node("Btn_" + label);
          node.addComponent(UITransform).setContentSize(BTN_W, BTN_H);
          var sp = node.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.spriteFrame = sf;
          sp.color = bgColor;
          var labNode = new Node('Label');
          node.addChild(labNode);
          labNode.addComponent(UITransform).setContentSize(BTN_W, BTN_H);
          var lab = labNode.addComponent(Label);
          lab.string = label;
          lab.fontSize = 24;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = textColor;
          var btn = node.addComponent(Button);
          btn.target = node;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.9;
          return node;
        };
        return ExitConfirmPopup;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FloodFill.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('floodFill', floodFill);
      cclegacy._RF.push({}, "ba77doDKyhIIKzw0mIAXuvb", "FloodFill", undefined);
      /**
       * BFS FloodFill — 从种子格出发，收集所有四连通、同 brushIndex、未填充的格子。
       *
       * @param seedRow     种子行
       * @param seedCol     种子列
       * @param brushIndex  目标颜色编号
       * @param boardData   盘面数据（取 getBrushIndex）
       * @param isFilled    判定格子是否已填充的回调
       * @returns           待填充的 CellBrushEntry 数组（含种子自身）
       */
      function floodFill(seedRow, seedCol, brushIndex, boardData, isFilled) {
        var rows = boardData.gridRows;
        var cols = boardData.gridCols;
        if (seedRow < 0 || seedRow >= rows || seedCol < 0 || seedCol >= cols) return [];
        if (boardData.getBrushIndex(seedRow, seedCol) !== brushIndex) return [];
        if (isFilled(seedRow, seedCol)) return [];
        var visited = new Uint8Array(rows * cols);
        var result = [];
        var queue = [seedRow * cols + seedCol];
        visited[queue[0]] = 1;
        var DR = [-1, 1, 0, 0];
        var DC = [0, 0, -1, 1];
        while (queue.length > 0) {
          var idx = queue.shift();
          var r = idx / cols | 0;
          var c = idx % cols;
          result.push({
            row: r,
            col: c,
            brushIndex: brushIndex
          });
          for (var d = 0; d < 4; d++) {
            var nr = r + DR[d];
            var nc = c + DC[d];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            var ni = nr * cols + nc;
            if (visited[ni]) continue;
            if (boardData.getBrushIndex(nr, nc) !== brushIndex) continue;
            if (isFilled(nr, nc)) continue;
            visited[ni] = 1;
            queue.push(ni);
          }
        }
        return result;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a6d62llLz9HDKYr7d+BmhvD", "GameConfig", undefined);
      /**
       * 全局数值配置 — 纯数据，零依赖
       */
      var GameConfig = exports('GameConfig', {
        // ==================== 基础尺寸 ====================
        /** 单格在屏幕上的显示边长（像素） */
        defaultCellDisplaySize: 20,
        viewportWidth: 960,
        viewportHeight: 1320,
        gridCols: 120,
        gridRows: 120,
        // ==================== 视口/缩放 ====================
        maxScale: 1,
        viewportPadding: 200,
        /** WASD/HJKL 平移视口（像素/秒） */
        viewportArrowPanSpeed: 600,
        viewportZoomStep: 0.1,
        /** 整盘适配屏幕时，相对「刚好塞进视口」的缩放比例 */
        viewportAutoFitScreenRatio: 0.9,
        /** 最大放大：较短边约可见此数量的格子 */
        viewportMaxZoomVisibleCells: 8,
        /** scale *= (1 ± 此值×dt) */
        viewportZoomSpeedPerSecond: 2,
        viewportAutoFit: true,
        /** 橡皮筋阻力 */
        viewportRubberBandFactor: 0.3,
        /** 松手后弹回合法范围的时长（秒） */
        viewportSnapBackDuration: 0.25,
        viewportDetailSmoothLowT: 0,
        viewportDetailSmoothHighT: 0.5,
        /** 纹理上传前 alpha 量化档位数 */
        viewportZoomFadeAlphaSteps: 20,
        // ==================== 输入/绘制 ====================
        /** 错误格吸附时每边放大量（屏幕 px） */
        correctCellExpandPx: 25,
        paintSnapRadiusPx: 40,
        /** 单指平移判定 moved 的阈值 */
        moveThreshold: 5,
        // ==================== 棋盘颜色（0xRRGGBB） ====================
        boardGrayMinColor: 0x868686,
        boardFadeColor: 0xffffff,
        selectedCellColor: 0x858585,
        selectedCellFadeColor: 0xb9b9b9,
        // ==================== 调色板 ====================
        paletteItemWidth: 120,
        paletteItemHeight: 120,
        paletteItemSpacing: 12,
        palettePadding: 14,
        paletteLabelFontSize: 28,
        /** 选中描边颜色（0xRRGGBB） */
        paletteRingColor: 0x303030,
        paletteRingOutset: 4,
        paletteItemRootOutset: 6,
        paletteUseContrastLabel: true,
        /** 序号固定色（仅当 useContrastLabel=false） */
        paletteLabelFixedColor: 0xffffff,
        /** 每页列数 */
        paletteColumnsPerPage: 5,
        /** 每页行数 */
        paletteRowsPerPage: 2,
        /** 翻页滑动阈值 (px) */
        paletteSwipeThreshold: 50,
        /** 翻页吸附速度 (px/s) */
        paletteSnapSpeed: 3000,
        /** 默认显示页（0=道具, 1=第一页色块） */
        paletteDefaultPage: 1,
        // ==================== 结算界面 ====================
        /** 白色面板渐显时长（秒） */
        settlementFadeInDur: 0.3,
        /** fade-in 完成后到回放开始的延迟（秒） */
        settlementReplayStartDelay: 0.3,
        /** 回放总时长（秒） */
        settlementReplayDur: 1.8,
        /** 回放图占屏幕短边比例 */
        settlementImageScale: 0.85,
        /** 回放完成后按钮淡入延迟（秒） */
        settlementActionFadeInDelay: 0.5,
        /** 回放完成后按钮淡入时长（秒） */
        settlementActionFadeInDur: 0.3
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GamePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './ToolConfig.ts', './BoardBootstrap.ts', './PaletteInstaller.ts', './BoardRootPanInput.ts', './BoardTouchInput.ts', './BoardViewportInput.ts', './ToolExecutor.ts', './CompletionPopup.ts', './ExitConfirmPopup.ts', './PaintSnapRules.ts', './Toast.ts', './ProgressBar.ts', './BundleManager.ts'], function (exports) {
  var _inheritsLoose, _extends, cclegacy, _decorator, view, UITransform, Node, Label, Color, Button, Component, GameConfig, ToolDefs, ToolTriggerMode, ToolType, BoardBootstrap, PaletteInstaller, BoardRootPanInput, BoardTouchInput, BoardViewportInput, ToolExecutor, CompletionPopup, ExitConfirmPopup, cellFilled, showToast, ProgressBar, BundleManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      UITransform = module.UITransform;
      Node = module.Node;
      Label = module.Label;
      Color = module.Color;
      Button = module.Button;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      ToolDefs = module.ToolDefs;
      ToolTriggerMode = module.ToolTriggerMode;
      ToolType = module.ToolType;
    }, function (module) {
      BoardBootstrap = module.BoardBootstrap;
    }, function (module) {
      PaletteInstaller = module.PaletteInstaller;
    }, function (module) {
      BoardRootPanInput = module.BoardRootPanInput;
    }, function (module) {
      BoardTouchInput = module.BoardTouchInput;
    }, function (module) {
      BoardViewportInput = module.BoardViewportInput;
    }, function (module) {
      ToolExecutor = module.ToolExecutor;
    }, function (module) {
      CompletionPopup = module.CompletionPopup;
    }, function (module) {
      ExitConfirmPopup = module.ExitConfirmPopup;
    }, function (module) {
      cellFilled = module.cellFilled;
    }, function (module) {
      showToast = module.showToast;
    }, function (module) {
      ProgressBar = module.ProgressBar;
    }, function (module) {
      BundleManager = module.BundleManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ded18CX5i9GpaXxSGOR+VlD", "GamePage", undefined);
      var ccclass = _decorator.ccclass;
      var GamePage = exports('GamePage', (_dec = ccclass('GamePage'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GamePage, _Component);
        function GamePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._assets = null;
          _this._onBack = null;
          _this._toolState = null;
          _this._ctx = null;
          _this._currentLevelId = null;
          _this._currentPuzzle = null;
          _this._popupLayer = null;
          _this._topLayer = null;
          return _this;
        }
        var _proto = GamePage.prototype;
        _proto.init = function init(assets, toolState, onBack) {
          this._assets = assets;
          this._toolState = toolState;
          this._onBack = onBack;
        };
        _proto.startLevel = function startLevel(entry) {
          var _this2 = this;
          this.cleanup();
          this._currentLevelId = entry.id;
          BundleManager.loadPuzzle(entry.jsonPath).then(function (jsonAsset) {
            _this2._buildGame(jsonAsset.json, entry.id);
          })["catch"](function () {});
        };
        _proto.cleanup = function cleanup() {
          if (this._ctx) {
            this._ctx.saveManager.forceFlush();
          }
          this._ctx = null;
          this._currentLevelId = null;
          this._currentPuzzle = null;
          this._popupLayer = null;
          this._topLayer = null;
          this.node.removeAllChildren();
        };
        _proto._buildGame = function _buildGame(puzzle, levelId) {
          var _this3 = this;
          this._currentPuzzle = puzzle;
          var a = this._assets;
          var vs = view.getVisibleSize();
          var gameLayer = this._createLayer('GameLayer', vs);
          var hudLayer = this._createLayer('HudLayer', vs);
          this._popupLayer = this._createLayer('PopupLayer', vs);
          this._topLayer = this._createLayer('TopLayer', vs);
          var toolState = this._toolState;
          var ctx = BoardBootstrap.run({
            boardRoot: gameLayer,
            puzzle: puzzle,
            cellDisplaySize: a.cellDisplaySize,
            digitMaterial: a.digitMaterial,
            levelId: levelId,
            toolState: toolState,
            viewport: {
              zoomStep: GameConfig.viewportZoomStep,
              zoomSpeedPerSecond: GameConfig.viewportZoomSpeedPerSecond,
              autoFitInitial: GameConfig.viewportAutoFit
            }
          });
          this._ctx = ctx;
          ctx.saveManager.onAllComplete = function () {
            return _this3._showCompletion();
          };
          ctx.onToast = function (msg) {
            if (_this3._topLayer) showToast(_this3._topLayer, msg);
          };
          var hudUt = hudLayer.getComponent(UITransform);
          var progressBar = ProgressBar.create(hudLayer, vs.width, hudUt.height / 2 - 50);
          var palettePanel = null;
          if (a.paletteItemSprite) {
            palettePanel = PaletteInstaller.install(hudLayer, ctx.boardData.palette, ctx.brushState, a.paletteItemSprite, _extends({}, a.paletteStyle, {
              onBrushIndexChanged: function onBrushIndexChanged() {
                return ctx.refreshDetailVisibility();
              }
            }), toolState, function (type) {
              return _this3._handleToolClick(type);
            });
          }
          var sm = ctx.saveManager;
          var isBrushComplete = function isBrushComplete(i) {
            return sm.brushTotalCounts[i] > 0 && sm.brushFilledCounts[i] >= sm.brushTotalCounts[i];
          };
          sm.onProgressChanged = function (f, t) {
            return progressBar.update(f, t);
          };
          sm.onBrushComplete = function (bi) {
            var _palettePanel, _palettePanel2;
            (_palettePanel = palettePanel) == null || _palettePanel.markBrushComplete(bi);
            (_palettePanel2 = palettePanel) == null || _palettePanel2.autoSelectNextUnfinished(bi, isBrushComplete);
            ctx.refreshDetailVisibility();
          };
          var initP = sm.getProgress();
          progressBar.update(initP.filled, initP.total);
          for (var i = 0; i < sm.brushTotalCounts.length; i++) {
            var _palettePanel3;
            if (isBrushComplete(i)) (_palettePanel3 = palettePanel) == null || _palettePanel3.markBrushComplete(i);
          }
          this._buildBackButton(hudLayer, vs.width);
          var touchHost = ctx.brushLayer.node;
          touchHost.addComponent(BoardTouchInput).init(ctx);
          gameLayer.addComponent(BoardViewportInput).init(ctx);
          gameLayer.addComponent(BoardRootPanInput).init(ctx);
        };
        _proto._buildBackButton = function _buildBackButton(parent, viewW) {
          var _this4 = this;
          var btn = new Node('BackBtn');
          parent.addChild(btn);
          btn.setPosition(-viewW / 2 + 60, parent.getComponent(UITransform).height / 2 - 50, 0);
          var ut = btn.addComponent(UITransform);
          ut.setContentSize(80, 50);
          var lab = btn.addComponent(Label);
          lab.string = '< 返回';
          lab.fontSize = 30;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = new Color(60, 60, 60, 255);
          var button = btn.addComponent(Button);
          button.target = btn;
          button.transition = Button.Transition.SCALE;
          button.zoomScale = 0.9;
          button.node.on(Button.EventType.CLICK, function () {
            return _this4._confirmExit();
          });
        };
        _proto._confirmExit = function _confirmExit() {
          var _this5 = this;
          var layer = this._popupLayer;
          if (!layer) return;
          ExitConfirmPopup.show(layer, function () {}, function () {
            return _this5._onBack == null ? void 0 : _this5._onBack();
          });
        };
        _proto._handleToolClick = function _handleToolClick(type) {
          var ctx = this._ctx;
          var ts = this._toolState;
          if (!ctx || !ts) return;
          if (ts.getCount(type) <= 0) {
            if (this._topLayer) showToast(this._topLayer, '道具次数不足');
            return;
          }
          var def = ToolDefs.find(function (d) {
            return d.type === type;
          });
          if (!def) return;
          if (def.triggerMode === ToolTriggerMode.ClickTool) {
            this._executeMagnifier(ctx, ts);
            return;
          }
          ts.activate(type);
        };
        _proto._executeMagnifier = function _executeMagnifier(ctx, ts) {
          var isFilled = function isFilled(r, c) {
            return cellFilled(ctx.boardData, ctx.brushLayer.pixelBuffer, r, c);
          };
          var region = ToolExecutor.magnifierFind(ctx.brushState.currentIndex, ctx.boardData, isFilled);
          if (region.length === 0) {
            var nextBrush = this._findNextUnfinishedBrush(ctx);
            if (nextBrush >= 0 && nextBrush !== ctx.brushState.currentIndex) {
              ctx.brushState.currentIndex = nextBrush;
              ctx.refreshDetailVisibility();
              region = ToolExecutor.magnifierFind(nextBrush, ctx.boardData, isFilled);
            }
          }
          if (region.length === 0) {
            if (this._topLayer) showToast(this._topLayer, '当前颜色已涂完');
            return;
          }
          if (!ts.consume(ToolType.Magnifier)) return;
          ctx.magnifierEffect.start(region, ctx);
        };
        _proto._findNextUnfinishedBrush = function _findNextUnfinishedBrush(ctx) {
          var sm = ctx.saveManager;
          var paletteLen = sm.brushTotalCounts.length;
          var cur = ctx.brushState.currentIndex;
          for (var offset = 1; offset < paletteLen; offset++) {
            var idx = (cur + offset) % paletteLen;
            if (sm.brushTotalCounts[idx] > 0 && sm.brushFilledCounts[idx] < sm.brushTotalCounts[idx]) {
              return idx;
            }
          }
          return -1;
        };
        _proto._showCompletion = function _showCompletion() {
          var _this6 = this;
          var layer = this._popupLayer;
          var ctx = this._ctx;
          var puzzle = this._currentPuzzle;
          if (!layer || !ctx || !puzzle) return;
          var vs = view.getVisibleSize();
          var history = [].concat(ctx.saveManager.record.getHistory());
          CompletionPopup.show(layer, vs.width, vs.height, puzzle, history, function () {
            return _this6._onBack == null ? void 0 : _this6._onBack();
          });
        };
        _proto._createLayer = function _createLayer(name, vs) {
          var layer = new Node(name);
          this.node.addChild(layer);
          var ut = layer.addComponent(UITransform);
          ut.setContentSize(vs.width, vs.height);
          return layer;
        };
        return GamePage;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HomePage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelManifest.ts', './PuzzlePreview.ts', './LevelCard.ts', './LevelDetailPopup.ts', './StorageService.ts', './BundleManager.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, view, Node, UITransform, Widget, Sprite, Color, Label, Button, Mask, MaskType, Layout, ScrollView, Component, LevelManifest, PuzzlePreview, LevelCard, LevelDetailPopup, StorageService, BundleManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Widget = module.Widget;
      Sprite = module.Sprite;
      Color = module.Color;
      Label = module.Label;
      Button = module.Button;
      Mask = module.Mask;
      MaskType = module.MaskType;
      Layout = module.Layout;
      ScrollView = module.ScrollView;
      Component = module.Component;
    }, function (module) {
      LevelManifest = module.LevelManifest;
    }, function (module) {
      PuzzlePreview = module.PuzzlePreview;
    }, function (module) {
      LevelCard = module.LevelCard;
    }, function (module) {
      LevelDetailPopup = module.LevelDetailPopup;
    }, function (module) {
      StorageService = module.StorageService;
    }, function (module) {
      BundleManager = module.BundleManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "c62492Uu3JCuYtGpvvcfFSd", "HomePage", undefined);
      var ccclass = _decorator.ccclass;
      var TOP_BAR_HEIGHT = 120;
      var CARD_WIDTH = 320;
      var CARD_HEIGHT = 380;
      var CARD_GAP = 24;
      var COLS = 2;
      var SIDE_PADDING = 24;
      var HomePage = exports('HomePage', (_dec = ccclass('HomePage'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HomePage, _Component);
        function HomePage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._onSelectLevel = null;
          _this._onMyWorks = null;
          _this._scrollContent = null;
          _this._popupLayer = null;
          return _this;
        }
        var _proto = HomePage.prototype;
        _proto.init = function init(onSelectLevel, onMyWorks) {
          this._onSelectLevel = onSelectLevel;
          this._onMyWorks = onMyWorks;
          this._build();
        }

        /** 从 GamePage 返回时调用：重建关卡列表以刷新状态徽章 */;
        _proto.refreshList = function refreshList() {
          if (this._scrollContent) {
            this._scrollContent.removeAllChildren();
            this._loadAllLevels(this._scrollContent);
          }
        };
        _proto._build = function _build() {
          this.node.removeAllChildren();
          this._scrollContent = null;
          this._popupLayer = null;
          var vs = view.getVisibleSize();
          this._buildTopBar(vs.width);
          this._buildScroll(vs.width, vs.height);
          var popupLayer = new Node('PopupLayer');
          this.node.addChild(popupLayer);
          popupLayer.addComponent(UITransform).setContentSize(vs.width, vs.height);
          this._popupLayer = popupLayer;
        }

        /* ========== TopBar ========== */;
        _proto._buildTopBar = function _buildTopBar(viewW) {
          var _this2 = this;
          var bar = new Node('TopBar');
          this.node.addChild(bar);
          var barUt = bar.addComponent(UITransform);
          barUt.setContentSize(viewW, TOP_BAR_HEIGHT);
          var w = bar.addComponent(Widget);
          w.isAlignTop = true;
          w.top = 0;
          w.isAlignLeft = true;
          w.left = 0;
          w.isAlignRight = true;
          w.right = 0;
          w.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;

          // 背景
          var bgNode = new Node('BarBg');
          bar.addChild(bgNode);
          var bgUt = bgNode.addComponent(UITransform);
          bgUt.setContentSize(viewW, TOP_BAR_HEIGHT);
          var bgSp = bgNode.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.color = new Color(245, 245, 245, 255);

          // 标题
          var titleNode = new Node('Title');
          bar.addChild(titleNode);
          titleNode.setPosition(0, -10, 0);
          var tUt = titleNode.addComponent(UITransform);
          tUt.setContentSize(300, 50);
          var titleLab = titleNode.addComponent(Label);
          titleLab.string = '选择关卡';
          titleLab.fontSize = 40;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(50, 50, 50, 255);

          // "我的作品"按钮（预留）
          var myWorksNode = new Node('MyWorksBtn');
          bar.addChild(myWorksNode);
          myWorksNode.setPosition(viewW / 2 - 80, -10, 0);
          var mwUt = myWorksNode.addComponent(UITransform);
          mwUt.setContentSize(120, 50);
          var mwLab = myWorksNode.addComponent(Label);
          mwLab.string = '我的作品';
          mwLab.fontSize = 24;
          mwLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          mwLab.verticalAlign = Label.VerticalAlign.CENTER;
          mwLab.color = new Color(100, 100, 100, 255);
          var mwBtn = myWorksNode.addComponent(Button);
          mwBtn.target = myWorksNode;
          mwBtn.transition = Button.Transition.SCALE;
          mwBtn.zoomScale = 0.9;
          mwBtn.node.on(Button.EventType.CLICK, function () {
            return _this2._onMyWorks == null ? void 0 : _this2._onMyWorks();
          });
        }

        /* ========== ScrollView ========== */;
        _proto._buildScroll = function _buildScroll(viewW, viewH) {
          var scrollH = viewH - TOP_BAR_HEIGHT;

          // ScrollView 节点
          var scrollNode = new Node('LevelScroll');
          this.node.addChild(scrollNode);
          scrollNode.setPosition(0, -TOP_BAR_HEIGHT / 2, 0);
          var svUt = scrollNode.addComponent(UITransform);
          svUt.setContentSize(viewW, scrollH);
          var sw = scrollNode.addComponent(Widget);
          sw.isAlignTop = true;
          sw.top = TOP_BAR_HEIGHT;
          sw.isAlignBottom = true;
          sw.bottom = 0;
          sw.isAlignLeft = true;
          sw.left = 0;
          sw.isAlignRight = true;
          sw.right = 0;
          sw.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;

          // Mask view
          var viewNode = new Node('view');
          scrollNode.addChild(viewNode);
          var vUt = viewNode.addComponent(UITransform);
          vUt.setContentSize(viewW, scrollH);
          viewNode.addComponent(Mask).type = MaskType.GRAPHICS_RECT;

          // Content
          var content = new Node('Content');
          viewNode.addChild(content);
          var cUt = content.addComponent(UITransform);
          cUt.setAnchorPoint(0.5, 1);
          content.setPosition(0, scrollH / 2, 0);
          var layout = content.addComponent(Layout);
          layout.type = Layout.Type.GRID;
          layout.resizeMode = Layout.ResizeMode.CONTAINER;
          layout.startAxis = Layout.AxisDirection.HORIZONTAL;
          layout.cellSize.set(CARD_WIDTH, CARD_HEIGHT);
          layout.spacingX = CARD_GAP;
          layout.spacingY = CARD_GAP;
          layout.paddingTop = CARD_GAP;
          layout.paddingBottom = CARD_GAP;
          layout.paddingLeft = SIDE_PADDING;
          layout.paddingRight = SIDE_PADDING;
          layout.constraint = Layout.Constraint.FIXED_COL;
          layout.constraintNum = COLS;
          var scroll = scrollNode.addComponent(ScrollView);
          scroll.content = content;
          scroll.horizontal = false;
          scroll.vertical = true;
          scroll.elastic = true;
          scroll.bounceDuration = 0.3;
          scroll.brake = 0.75;
          scroll.inertia = true;
          this._scrollContent = content;
        }

        /* ========== 加载关卡列表 ========== */;
        _proto._loadAllLevels = function _loadAllLevels(content) {
          var _this3 = this;
          var _loop = function _loop() {
            var entry = _step.value;
            var status = _this3._getLevelStatus(entry.id);
            if (status === 'done') return 1; // continue
            BundleManager.loadPuzzle(entry.jsonPath).then(function (jsonAsset) {
              var puzzle = jsonAsset.json;
              var paintedSet;
              if (status === 'progress') {
                paintedSet = new Set();
                for (var _iterator2 = _createForOfIteratorHelperLoose(StorageService.loadPaintRecord(entry.id)), _step2; !(_step2 = _iterator2()).done;) {
                  var r = _step2.value;
                  paintedSet.add(r.row * puzzle.gridSize + r.col);
                }
              }
              var previewSF = PuzzlePreview.createSpriteFrame(puzzle, paintedSet);
              var card = LevelCard.create(entry.name, previewSF, function () {
                return _this3._showLevelDetail(entry, previewSF);
              }, status);
              content.addChild(card);
            });
          };
          for (var _iterator = _createForOfIteratorHelperLoose(LevelManifest), _step; !(_step = _iterator()).done;) {
            if (_loop()) continue;
          }
        };
        _proto._showLevelDetail = function _showLevelDetail(entry, previewSF) {
          var _this4 = this;
          if (!this._popupLayer) return;
          LevelDetailPopup.show(this._popupLayer, entry, previewSF, function (e) {
            return _this4._onSelectLevel == null ? void 0 : _this4._onSelectLevel(e);
          });
        };
        _proto._getLevelStatus = function _getLevelStatus(levelId) {
          if (StorageService.isLevelDone(levelId)) return 'done';
          if (StorageService.hasPaintRecord(levelId)) return 'progress';
          return 'new';
        };
        return HomePage;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LaunchRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BundleManager.ts', './WhitePixel.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, view, UITransform, Node, Sprite, Color, Widget, Label, Button, Component, director, BundleManager, getWhitePixelSF;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      UITransform = module.UITransform;
      Node = module.Node;
      Sprite = module.Sprite;
      Color = module.Color;
      Widget = module.Widget;
      Label = module.Label;
      Button = module.Button;
      Component = module.Component;
      director = module.director;
    }, function (module) {
      BundleManager = module.BundleManager;
    }, function (module) {
      getWhitePixelSF = module.getWhitePixelSF;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "fb6b3LZchJB57bhANho+aVE", "LaunchRoot", undefined);
      var ccclass = _decorator.ccclass;
      var LaunchRoot = exports('LaunchRoot', (_dec = ccclass('LaunchRoot'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LaunchRoot, _Component);
        function LaunchRoot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._progressFill = null;
          _this._progressLabel = null;
          _this._barWidth = 0;
          return _this;
        }
        var _proto = LaunchRoot.prototype;
        _proto.start = function start() {
          var vs = view.getVisibleSize();
          var ut = this.node.getComponent(UITransform);
          if (ut) ut.setContentSize(vs.width, vs.height);
          this._buildUI(vs.width, vs.height);
        };
        _proto._buildUI = function _buildUI(vw, vh) {
          var _this2 = this;
          var sf = getWhitePixelSF();

          // ── 全屏白色背景 ──
          var bg = new Node('Bg');
          this.node.addChild(bg);
          bg.addComponent(UITransform).setContentSize(vw, vh);
          var bgSp = bg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = Color.WHITE;
          var w = bg.addComponent(Widget);
          w.isAlignTop = true;
          w.top = 0;
          w.isAlignBottom = true;
          w.bottom = 0;
          w.isAlignLeft = true;
          w.left = 0;
          w.isAlignRight = true;
          w.right = 0;
          w.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;

          // ── 标题 ──
          var title = new Node('Title');
          this.node.addChild(title);
          title.setPosition(0, 100, 0);
          title.addComponent(UITransform).setContentSize(400, 80);
          var titleLab = title.addComponent(Label);
          titleLab.string = '像素涂色';
          titleLab.fontSize = 56;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(60, 60, 60, 255);

          // ── 开始按钮 ──
          var btnNode = new Node('StartBtn');
          this.node.addChild(btnNode);
          btnNode.setPosition(0, -40, 0);
          btnNode.addComponent(UITransform).setContentSize(240, 64);
          var btnSp = btnNode.addComponent(Sprite);
          btnSp.sizeMode = Sprite.SizeMode.CUSTOM;
          btnSp.spriteFrame = sf;
          btnSp.color = new Color(76, 175, 80, 255);
          var btnLab = new Node('Label');
          btnNode.addChild(btnLab);
          btnLab.addComponent(UITransform).setContentSize(240, 64);
          var bl = btnLab.addComponent(Label);
          bl.string = '开始游戏';
          bl.fontSize = 32;
          bl.horizontalAlign = Label.HorizontalAlign.CENTER;
          bl.verticalAlign = Label.VerticalAlign.CENTER;
          bl.color = Color.WHITE;
          var btn = btnNode.addComponent(Button);
          btn.target = btnNode;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.9;
          btn.node.on(Button.EventType.CLICK, function () {
            return _this2._onStartClick(btnNode);
          });
          this._buildProgressBar(vw);
        };
        _proto._buildProgressBar = function _buildProgressBar(vw) {
          var barW = vw * 0.6;
          this._barWidth = barW;
          var root = new Node('LoadingBar');
          this.node.addChild(root);
          root.setPosition(0, -140, 0);
          root.active = false;
          var sf = getWhitePixelSF();
          var bgBar = new Node('Bg');
          root.addChild(bgBar);
          bgBar.addComponent(UITransform).setContentSize(barW, 12);
          var bgSp = bgBar.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = new Color(220, 220, 220, 255);
          var fill = new Node('Fill');
          bgBar.addChild(fill);
          var fillUt = fill.addComponent(UITransform);
          fillUt.setContentSize(0, 12);
          fillUt.setAnchorPoint(0, 0.5);
          fill.setPosition(-barW / 2, 0, 0);
          var fillSp = fill.addComponent(Sprite);
          fillSp.sizeMode = Sprite.SizeMode.CUSTOM;
          fillSp.spriteFrame = sf;
          fillSp.color = new Color(76, 175, 80, 255);
          this._progressFill = fillUt;
          var labNode = new Node('Percent');
          root.addChild(labNode);
          labNode.setPosition(0, -24, 0);
          labNode.addComponent(UITransform).setContentSize(200, 30);
          var lab = labNode.addComponent(Label);
          lab.string = '加载中...';
          lab.fontSize = 22;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = new Color(120, 120, 120, 255);
          this._progressLabel = lab;
        };
        _proto._onStartClick = /*#__PURE__*/function () {
          var _onStartClick2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(btnNode) {
            var _this3 = this;
            var bar;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  btnNode.active = false;
                  bar = this.node.getChildByName('LoadingBar');
                  if (bar) bar.active = true;
                  _context.prev = 3;
                  _context.next = 6;
                  return BundleManager.load(function (finished, total) {
                    var ratio = total > 0 ? finished / total : 0;
                    if (_this3._progressFill) {
                      _this3._progressFill.setContentSize(_this3._barWidth * ratio, 12);
                    }
                    if (_this3._progressLabel) {
                      _this3._progressLabel.string = "\u52A0\u8F7D\u4E2D... " + Math.round(ratio * 100) + "%";
                    }
                  });
                case 6:
                  director.loadScene('game');
                  _context.next = 14;
                  break;
                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](3);
                  if (this._progressLabel) {
                    this._progressLabel.string = '加载失败，请重试';
                  }
                  btnNode.active = true;
                  if (bar) bar.active = false;
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[3, 9]]);
          }));
          function _onStartClick(_x) {
            return _onStartClick2.apply(this, arguments);
          }
          return _onStartClick;
        }();
        return LaunchRoot;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelCard.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, cclegacy, Color, Node, UITransform, Sprite, Label, Button;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "089b9/ft9JNm6j4VXu1UcKA", "LevelCard", undefined);
      var DEFAULT_STYLE = {
        width: 320,
        height: 380,
        previewSize: 280,
        nameFontSize: 28,
        nameColor: new Color(50, 50, 50, 255),
        bgColor: new Color(255, 255, 255, 255)
      };
      var LevelCard = exports('LevelCard', /*#__PURE__*/function () {
        function LevelCard() {}
        LevelCard.create = function create(name, previewFrame, onClick, status, style) {
          if (status === void 0) {
            status = 'new';
          }
          if (style === void 0) {
            style = {};
          }
          var s = _extends({}, DEFAULT_STYLE, style);
          var root = new Node("LevelCard_" + name);
          var rootUt = root.addComponent(UITransform);
          rootUt.setContentSize(s.width, s.height);
          var bg = new Node('Bg');
          root.addChild(bg);
          var bgUt = bg.addComponent(UITransform);
          bgUt.setContentSize(s.width, s.height);
          var bgSp = bg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.color = s.bgColor.clone();
          var preview = new Node('Preview');
          root.addChild(preview);
          preview.setPosition(0, (s.height - s.previewSize) / 2 - 10, 0);
          var pvUt = preview.addComponent(UITransform);
          pvUt.setContentSize(s.previewSize, s.previewSize);
          var pvSp = preview.addComponent(Sprite);
          pvSp.sizeMode = Sprite.SizeMode.CUSTOM;
          if (previewFrame) {
            pvSp.spriteFrame = previewFrame;
          } else {
            pvSp.color = new Color(200, 200, 200, 255);
          }
          var labelNode = new Node('Name');
          root.addChild(labelNode);
          labelNode.setPosition(0, -s.height / 2 + 30, 0);
          var lUt = labelNode.addComponent(UITransform);
          lUt.setContentSize(s.width, 40);
          var lab = labelNode.addComponent(Label);
          lab.string = name;
          lab.fontSize = s.nameFontSize;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = s.nameColor.clone();
          if (status !== 'new') {
            this._addStatusBadge(root, s, status);
          }
          var btn = root.addComponent(Button);
          btn.target = root;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.95;
          btn.node.on(Button.EventType.CLICK, onClick);
          return root;
        };
        LevelCard._addStatusBadge = function _addStatusBadge(root, s, status) {
          var badge = new Node('StatusBadge');
          root.addChild(badge);
          var isDone = status === 'done';
          var text = isDone ? "\u2714" : '...';
          var bgColor = isDone ? new Color(76, 175, 80, 230) : new Color(255, 152, 0, 230);
          var size = isDone ? 40 : 50;
          badge.setPosition(s.width / 2 - size / 2 - 8, s.height / 2 - size / 2 - 8, 0);
          var bUt = badge.addComponent(UITransform);
          bUt.setContentSize(size, size);
          var bSp = badge.addComponent(Sprite);
          bSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bSp.color = bgColor;
          var lblNode = new Node('BadgeLabel');
          badge.addChild(lblNode);
          var lUt = lblNode.addComponent(UITransform);
          lUt.setContentSize(size, size);
          var lbl = lblNode.addComponent(Label);
          lbl.string = text;
          lbl.fontSize = isDone ? 26 : 20;
          lbl.horizontalAlign = Label.HorizontalAlign.CENTER;
          lbl.verticalAlign = Label.VerticalAlign.CENTER;
          lbl.color = new Color(255, 255, 255, 255);
        };
        return LevelCard;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelDetailPopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PuzzlePreview.ts', './StorageService.ts', './WhitePixel.ts', './BundleManager.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, view, Node, UITransform, Sprite, UIOpacity, Button, Label, tween, Vec3, PuzzlePreview, StorageService, getWhitePixelSF, BundleManager;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      Button = module.Button;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      PuzzlePreview = module.PuzzlePreview;
    }, function (module) {
      StorageService = module.StorageService;
    }, function (module) {
      getWhitePixelSF = module.getWhitePixelSF;
    }, function (module) {
      BundleManager = module.BundleManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3c672HojoFPYI7D4krfzM2C", "LevelDetailPopup", undefined);
      var INFO_FONT = 24;
      var INFO_COLOR = new Color(120, 120, 120, 255);
      var CARD_PAD = 30;
      var LevelDetailPopup = exports('LevelDetailPopup', /*#__PURE__*/function () {
        function LevelDetailPopup() {}
        LevelDetailPopup.show = function show(parent, entry, previewFrame, onStart) {
          var vs = view.getVisibleSize();
          var sf = getWhitePixelSF();
          var cardW = vs.width * 0.8;
          var previewSize = cardW * 0.65;
          var cardH = CARD_PAD + previewSize + 160 + 70 + CARD_PAD;

          /* ── 根 ── */
          var root = new Node('LevelDetail');
          parent.addChild(root);
          root.addComponent(UITransform).setContentSize(vs.width, vs.height);

          /* ── 遮罩 ── */
          var overlay = new Node('Overlay');
          root.addChild(overlay);
          overlay.addComponent(UITransform).setContentSize(vs.width, vs.height);
          var oSp = overlay.addComponent(Sprite);
          oSp.sizeMode = Sprite.SizeMode.CUSTOM;
          oSp.spriteFrame = sf;
          oSp.color = new Color(0, 0, 0, 128);
          var overlayOp = overlay.addComponent(UIOpacity);
          overlayOp.opacity = 0;
          var oBtn = overlay.addComponent(Button);
          oBtn.target = overlay;
          oBtn.transition = Button.Transition.NONE;
          oBtn.node.on(Button.EventType.CLICK, function () {
            return dismiss();
          });

          /* ── 卡片 ── */
          var card = new Node('Card');
          root.addChild(card);
          card.addComponent(UITransform).setContentSize(cardW, cardH);
          var cardBg = new Node('Bg');
          card.addChild(cardBg);
          cardBg.addComponent(UITransform).setContentSize(cardW, cardH);
          var bgSp = cardBg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = Color.WHITE;

          /* ── 右上角关闭按钮 ── */
          var CLOSE_SIZE = 44;
          var closeNode = new Node('CloseBtn');
          card.addChild(closeNode);
          closeNode.setPosition(cardW / 2 - CLOSE_SIZE / 2 - 12, cardH / 2 - CLOSE_SIZE / 2 - 12, 0);
          closeNode.addComponent(UITransform).setContentSize(CLOSE_SIZE, CLOSE_SIZE);
          var closeLab = closeNode.addComponent(Label);
          closeLab.string = '✕';
          closeLab.fontSize = 28;
          closeLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          closeLab.verticalAlign = Label.VerticalAlign.CENTER;
          closeLab.color = new Color(160, 160, 160, 255);
          var closeBtn = closeNode.addComponent(Button);
          closeBtn.target = closeNode;
          closeBtn.transition = Button.Transition.SCALE;
          closeBtn.zoomScale = 0.85;
          closeBtn.node.on(Button.EventType.CLICK, function () {
            return dismiss();
          });

          /* ── 预览图 ── */
          var yOff = cardH / 2 - CARD_PAD - previewSize / 2;
          var imgNode = new Node('Preview');
          card.addChild(imgNode);
          imgNode.setPosition(0, yOff, 0);
          imgNode.addComponent(UITransform).setContentSize(previewSize, previewSize);
          var imgSp = imgNode.addComponent(Sprite);
          imgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          if (previewFrame) imgSp.spriteFrame = previewFrame;else imgSp.color = new Color(230, 230, 230, 255);

          /* ── 信息区域 ── */
          yOff -= previewSize / 2 + 24;
          var nameLab = this._label(card, entry.name, 32, new Color(50, 50, 50, 255), cardW, 40);
          nameLab.setPosition(0, yOff, 0);
          yOff -= 36;
          var infoLabel = this._label(card, '加载中...', INFO_FONT, INFO_COLOR, cardW, 30);
          infoLabel.setPosition(0, yOff, 0);
          yOff -= 32;
          var progressLabel = this._label(card, '', INFO_FONT, INFO_COLOR, cardW, 30);
          progressLabel.setPosition(0, yOff, 0);

          /* ── 开始按钮 ── */
          var hasProgress = StorageService.hasPaintRecord(entry.id);
          var startBtn = new Node('StartBtn');
          card.addChild(startBtn);
          startBtn.setPosition(0, -cardH / 2 + 35 + CARD_PAD, 0);
          startBtn.addComponent(UITransform).setContentSize(200, 56);
          var sBgSp = startBtn.addComponent(Sprite);
          sBgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          sBgSp.spriteFrame = sf;
          sBgSp.color = new Color(76, 175, 80, 255);
          var sLabNode = new Node('Label');
          startBtn.addChild(sLabNode);
          sLabNode.addComponent(UITransform).setContentSize(200, 56);
          var sLab = sLabNode.addComponent(Label);
          sLab.string = hasProgress ? '继续挑战' : '开始挑战';
          sLab.fontSize = 26;
          sLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          sLab.verticalAlign = Label.VerticalAlign.CENTER;
          sLab.color = Color.WHITE;
          var sBtn = startBtn.addComponent(Button);
          sBtn.target = startBtn;
          sBtn.transition = Button.Transition.SCALE;
          sBtn.zoomScale = 0.9;

          /* ── 弹出动画 ── */
          var cardOp = card.addComponent(UIOpacity);
          cardOp.opacity = 0;
          card.setScale(0.85, 0.85, 1);
          tween(overlayOp).to(0.25, {
            opacity: 255
          }).start();
          tween(cardOp).to(0.25, {
            opacity: 255
          }).start();
          tween(card).to(0.25, {
            scale: new Vec3(1, 1, 1)
          }).start();

          /* ── 预加载 JSON ── */
          var loadedPuzzle = null;
          BundleManager.loadPuzzle(entry.jsonPath).then(function (jsonAsset) {
            loadedPuzzle = jsonAsset.json;
            var p = loadedPuzzle;
            infoLabel.getComponent(Label).string = p.gridSize + " \xD7 " + p.gridSize + "    " + p.palette.length + " \u79CD\u989C\u8272";
            if (StorageService.hasPaintRecord(entry.id)) {
              var records = StorageService.loadPaintRecord(entry.id);
              var total = p.gridSize * p.gridSize;
              var pct = Math.round(records.length / total * 100);
              progressLabel.getComponent(Label).string = "\u8FDB\u5EA6: " + pct + "%";
            } else {
              progressLabel.getComponent(Label).string = '全新关卡';
            }
            if (!previewFrame) {
              var paintedSet;
              if (StorageService.hasPaintRecord(entry.id)) {
                paintedSet = new Set();
                for (var _iterator = _createForOfIteratorHelperLoose(StorageService.loadPaintRecord(entry.id)), _step; !(_step = _iterator()).done;) {
                  var r = _step.value;
                  paintedSet.add(r.row * p.gridSize + r.col);
                }
              }
              imgSp.spriteFrame = PuzzlePreview.createSpriteFrame(p, paintedSet);
            }
          });

          /* ── 点击开始 ── */
          sBtn.node.on(Button.EventType.CLICK, function () {
            dismiss(function () {
              return onStart(entry, loadedPuzzle);
            });
          });

          /* ── 关闭逻辑 ── */
          var dismissing = false;
          function dismiss(afterClose) {
            if (dismissing) return;
            dismissing = true;
            tween(overlayOp).to(0.2, {
              opacity: 0
            }).start();
            tween(cardOp).to(0.2, {
              opacity: 0
            }).start();
            tween(card).to(0.2, {
              scale: new Vec3(0.85, 0.85, 1)
            }).call(function () {
              root.destroy();
              afterClose == null || afterClose();
            }).start();
          }
        };
        LevelDetailPopup._label = function _label(parent, text, fontSize, color, w, h) {
          var node = new Node('Info');
          parent.addChild(node);
          node.addComponent(UITransform).setContentSize(w, h);
          var lab = node.addComponent(Label);
          lab.string = text;
          lab.fontSize = fontSize;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = color;
          return node;
        };
        return LevelDetailPopup;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelManifest.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c3868uGht5Nko++zp31PaeA", "LevelManifest", undefined);
      var LevelManifest = exports('LevelManifest', [{
        id: 'test_1px',
        name: '1px测试',
        jsonPath: 'puzzles/test_1px'
      }, {
        id: 'test_simple',
        name: '测试',
        jsonPath: 'puzzles/test_simple'
      }, {
        id: 'apple',
        name: '苹果',
        jsonPath: 'puzzles/apple'
      }, {
        id: 'mountain',
        name: '山水',
        jsonPath: 'puzzles/mountain'
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MagnifierEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ToolConfig.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, ToolParams;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ToolParams = module.ToolParams;
    }],
    execute: function () {
      cclegacy._RF.push({}, "03684b2k9dLiYtvCsgXe/Ln", "MagnifierEffect", undefined);
      /**
       * 放大镜动画：缩放到目标区域 → 闪烁 N 次 → 结束。
       * 由 BoardViewportInput.update 驱动 tick()。
       */
      var MagnifierEffect = exports('MagnifierEffect', /*#__PURE__*/function () {
        function MagnifierEffect() {
          this._phase = 0;
          this._targets = [];
          this._timer = 0;
          this._blinkCount = 0;
          this._blinkOn = false;
        }
        var _proto = MagnifierEffect.prototype;
        _proto.start = function start(targets, ctx) {
          if (targets.length === 0) return;
          this._targets = targets;
          this._phase = 1;
          this._timer = 0;
          this._blinkCount = 0;
          this._blinkOn = false;
          var focus = targets[0];
          var cw = ctx.cellDisplayW;
          var ch = ctx.cellDisplayH;
          var rows = ctx.boardData.gridRows;
          var bw = ctx.boardData.gridCols * cw;
          var bh = rows * ch;
          var cx = (focus.col + 0.5) * cw - bw / 2;
          var cy = bh / 2 - (rows - 1 - focus.row + 0.5) * ch;
          var vp = ctx.viewport;
          var targetScale = Math.min(vp.maxScale * 0.8, vp.maxScale);
          var targetPanX = -cx * targetScale;
          var targetPanY = -cy * targetScale;
          vp.snapTo(targetScale, targetPanX, targetPanY, ToolParams.magnifierZoomDuration);
        };
        _proto.tick = function tick(dt, ctx) {
          if (this._phase === 0) return;
          if (this._phase === 1) {
            if (!ctx.viewport.tickSnapBack(dt)) {
              this._phase = 2;
              this._timer = ToolParams.magnifierBlinkInterval;
              this._blinkOn = true;
              this._writeBrush(ctx, 100);
            }
            return;
          }
          this._timer -= dt;
          if (this._timer > 0) return;
          if (this._blinkOn) {
            this._blinkOn = false;
            this._blinkCount++;
            this._writeBrush(ctx, 0);
            if (this._blinkCount >= ToolParams.magnifierBlinkCount) {
              this._phase = 0;
              return;
            }
          } else {
            this._blinkOn = true;
            this._writeBrush(ctx, 100);
          }
          this._timer = ToolParams.magnifierBlinkInterval;
        };
        _proto._writeBrush = function _writeBrush(ctx, alpha) {
          var pb = ctx.brushLayer.pixelBuffer;
          for (var _iterator = _createForOfIteratorHelperLoose(this._targets), _step; !(_step = _iterator()).done;) {
            var t = _step.value;
            if (pb.getAlpha(t.row, t.col) === 255) continue;
            if (alpha > 0) {
              var _ctx$brushState$getRG = ctx.brushState.getRGB(t.brushIndex),
                r = _ctx$brushState$getRG[0],
                g = _ctx$brushState$getRG[1],
                b = _ctx$brushState$getRG[2];
              pb.setPixel(t.row, t.col, r, g, b, alpha);
            } else {
              pb.setPixel(t.row, t.col, 0, 0, 0, 0);
            }
          }
          ctx.brushLayer.flush();
        };
        _createClass(MagnifierEffect, [{
          key: "active",
          get: function get() {
            return this._phase > 0;
          }
        }]);
        return MagnifierEffect;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./AppRoot.ts', './LaunchRoot.ts', './BundleManager.ts', './GameConfig.ts', './LevelManifest.ts', './ToolConfig.ts', './PixelBuffer.ts', './FloodFill.ts', './BoardData.ts', './BrushState.ts', './BoardRootPanInput.ts', './BoardTouchInput.ts', './BoardViewportInput.ts', './CellConverter.ts', './PaintExecutor.ts', './PaintSnapRules.ts', './MagnifierEffect.ts', './ToolExecutor.ts', './ToolState.ts', './ViewportController.ts', './ZoomFadeMath.ts', './BoardBootstrap.ts', './BoardRuntimeContext.ts', './PaletteInstaller.ts', './BoardLayer.ts', './BrushLayer.ts', './DigitLayer.ts', './PaintRecord.ts', './PaintRecordCodec.ts', './PaintRestore.ts', './PaintSaveManager.ts', './StorageService.ts', './types.ts', './GamePage.ts', './ProgressBar.ts', './HomePage.ts', './LevelCard.ts', './MyWorksPage.ts', './PalettePanel.ts', './ToolPanel.ts', './CompletionPopup.ts', './ExitConfirmPopup.ts', './LevelDetailPopup.ts', './ReplayAnimator.ts', './PuzzlePreview.ts', './Toast.ts', './WhitePixel.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MyWorksPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelManifest.ts', './BoardData.ts', './PuzzlePreview.ts', './StorageService.ts', './WhitePixel.ts', './BundleManager.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, view, tween, Vec3, Node, UITransform, Sprite, Color, Widget, Label, Button, Mask, MaskType, Layout, ScrollView, UIOpacity, Component, LevelManifest, BoardData, PuzzlePreview, StorageService, getWhitePixelSF, BundleManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      tween = module.tween;
      Vec3 = module.Vec3;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Color = module.Color;
      Widget = module.Widget;
      Label = module.Label;
      Button = module.Button;
      Mask = module.Mask;
      MaskType = module.MaskType;
      Layout = module.Layout;
      ScrollView = module.ScrollView;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      LevelManifest = module.LevelManifest;
    }, function (module) {
      BoardData = module.BoardData;
    }, function (module) {
      PuzzlePreview = module.PuzzlePreview;
    }, function (module) {
      StorageService = module.StorageService;
    }, function (module) {
      getWhitePixelSF = module.getWhitePixelSF;
    }, function (module) {
      BundleManager = module.BundleManager;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "4034cW5NoFEB6BtbNK4laWb", "MyWorksPage", undefined);
      var ccclass = _decorator.ccclass;
      var TOP_BAR_HEIGHT = 120;
      var CARD_WIDTH = 320;
      var CARD_HEIGHT = 380;
      var CARD_GAP = 24;
      var COLS = 2;
      var SIDE_PADDING = 24;
      var PREVIEW_SIZE = 280;
      var SLIDE_IN_DUR = 0.3;
      var SLIDE_OUT_DUR = 0.25;
      var MyWorksPage = exports('MyWorksPage', (_dec = ccclass('MyWorksPage'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MyWorksPage, _Component);
        function MyWorksPage() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._onBack = null;
          _this._scrollContent = null;
          _this._emptyHint = null;
          _this._popupLayer = null;
          _this._sliding = false;
          return _this;
        }
        var _proto = MyWorksPage.prototype;
        _proto.init = function init(onBack) {
          this._onBack = onBack;
          this._build();
          this.node.active = false;
        }

        /** 从右侧滑入 */;
        _proto.show = function show() {
          this._sliding = false;
          this.node.active = true;
          this._refreshContent();
          var vs = view.getVisibleSize();
          this.node.setPosition(vs.width, 0, 0);
          tween(this.node).to(SLIDE_IN_DUR, {
            position: new Vec3(0, 0, 0)
          }).start();
        }

        /** 向右侧滑出 */;
        _proto.hide = function hide() {
          var _this2 = this;
          if (this._sliding) return;
          this._sliding = true;
          this._dismissPreviewPopup();
          var vs = view.getVisibleSize();
          tween(this.node).to(SLIDE_OUT_DUR, {
            position: new Vec3(vs.width, 0, 0)
          }).call(function () {
            _this2.node.active = false;
            _this2._onBack == null || _this2._onBack();
          }).start();
        }

        /* ========== 构建 ========== */;
        _proto._build = function _build() {
          this.node.removeAllChildren();
          this._scrollContent = null;
          this._emptyHint = null;
          this._popupLayer = null;
          var vs = view.getVisibleSize();
          var sf = getWhitePixelSF();

          /* ── 白色背景 ── */
          var bg = new Node('Bg');
          this.node.addChild(bg);
          bg.addComponent(UITransform).setContentSize(vs.width, vs.height);
          var bgSp = bg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = sf;
          bgSp.color = Color.WHITE;
          this._buildTopBar(vs.width);
          this._buildScroll(vs.width, vs.height);
          this._buildEmptyHint(vs.width, vs.height);
          this._buildPopupLayer(vs.width, vs.height);
        }

        /* ── TopBar ── */;
        _proto._buildTopBar = function _buildTopBar(viewW) {
          var _this3 = this;
          var bar = new Node('TopBar');
          this.node.addChild(bar);
          bar.addComponent(UITransform).setContentSize(viewW, TOP_BAR_HEIGHT);
          var w = bar.addComponent(Widget);
          w.isAlignTop = true;
          w.top = 0;
          w.isAlignLeft = true;
          w.left = 0;
          w.isAlignRight = true;
          w.right = 0;
          w.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
          var bgNode = new Node('BarBg');
          bar.addChild(bgNode);
          bgNode.addComponent(UITransform).setContentSize(viewW, TOP_BAR_HEIGHT);
          var bgSp = bgNode.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.color = new Color(245, 245, 245, 255);
          var titleNode = new Node('Title');
          bar.addChild(titleNode);
          titleNode.setPosition(0, -10, 0);
          titleNode.addComponent(UITransform).setContentSize(300, 50);
          var titleLab = titleNode.addComponent(Label);
          titleLab.string = '我的作品';
          titleLab.fontSize = 40;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(50, 50, 50, 255);
          var backNode = new Node('BackBtn');
          bar.addChild(backNode);
          backNode.setPosition(-viewW / 2 + 60, -10, 0);
          backNode.addComponent(UITransform).setContentSize(100, 50);
          var backLab = backNode.addComponent(Label);
          backLab.string = '< 返回';
          backLab.fontSize = 28;
          backLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          backLab.verticalAlign = Label.VerticalAlign.CENTER;
          backLab.color = new Color(100, 100, 100, 255);
          var backBtn = backNode.addComponent(Button);
          backBtn.target = backNode;
          backBtn.transition = Button.Transition.SCALE;
          backBtn.zoomScale = 0.9;
          backBtn.node.on(Button.EventType.CLICK, function () {
            return _this3.hide();
          });
        }

        /* ── ScrollView ── */;
        _proto._buildScroll = function _buildScroll(viewW, viewH) {
          var scrollH = viewH - TOP_BAR_HEIGHT;
          var scrollNode = new Node('WorksScroll');
          this.node.addChild(scrollNode);
          scrollNode.setPosition(0, -TOP_BAR_HEIGHT / 2, 0);
          scrollNode.addComponent(UITransform).setContentSize(viewW, scrollH);
          var sw = scrollNode.addComponent(Widget);
          sw.isAlignTop = true;
          sw.top = TOP_BAR_HEIGHT;
          sw.isAlignBottom = true;
          sw.bottom = 0;
          sw.isAlignLeft = true;
          sw.left = 0;
          sw.isAlignRight = true;
          sw.right = 0;
          sw.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
          var viewNode = new Node('view');
          scrollNode.addChild(viewNode);
          viewNode.addComponent(UITransform).setContentSize(viewW, scrollH);
          viewNode.addComponent(Mask).type = MaskType.GRAPHICS_RECT;
          var content = new Node('Content');
          viewNode.addChild(content);
          var cUt = content.addComponent(UITransform);
          cUt.setAnchorPoint(0.5, 1);
          content.setPosition(0, scrollH / 2, 0);
          var layout = content.addComponent(Layout);
          layout.type = Layout.Type.GRID;
          layout.resizeMode = Layout.ResizeMode.CONTAINER;
          layout.startAxis = Layout.AxisDirection.HORIZONTAL;
          layout.cellSize.set(CARD_WIDTH, CARD_HEIGHT);
          layout.spacingX = CARD_GAP;
          layout.spacingY = CARD_GAP;
          layout.paddingTop = CARD_GAP;
          layout.paddingBottom = CARD_GAP;
          layout.paddingLeft = SIDE_PADDING;
          layout.paddingRight = SIDE_PADDING;
          layout.constraint = Layout.Constraint.FIXED_COL;
          layout.constraintNum = COLS;
          var scroll = scrollNode.addComponent(ScrollView);
          scroll.content = content;
          scroll.horizontal = false;
          scroll.vertical = true;
          scroll.elastic = true;
          scroll.bounceDuration = 0.3;
          scroll.brake = 0.75;
          scroll.inertia = true;
          this._scrollContent = content;
        }

        /* ── 空状态 ── */;
        _proto._buildEmptyHint = function _buildEmptyHint(viewW, viewH) {
          var _this4 = this;
          var hint = new Node('EmptyHint');
          this.node.addChild(hint);
          hint.addComponent(UITransform).setContentSize(viewW, viewH);
          hint.active = false;
          var labNode = new Node('HintLabel');
          hint.addChild(labNode);
          labNode.setPosition(0, 40, 0);
          labNode.addComponent(UITransform).setContentSize(400, 60);
          var lab = labNode.addComponent(Label);
          lab.string = '还没有完成的作品';
          lab.fontSize = 32;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = new Color(160, 160, 160, 255);
          var btnNode = new Node('GoBtn');
          hint.addChild(btnNode);
          btnNode.setPosition(0, -30, 0);
          btnNode.addComponent(UITransform).setContentSize(200, 56);
          var btnSp = btnNode.addComponent(Sprite);
          btnSp.sizeMode = Sprite.SizeMode.CUSTOM;
          btnSp.color = new Color(76, 175, 80, 255);
          var btnLab = new Node('Label');
          btnNode.addChild(btnLab);
          btnLab.addComponent(UITransform).setContentSize(200, 56);
          var bl = btnLab.addComponent(Label);
          bl.string = '去挑战';
          bl.fontSize = 26;
          bl.horizontalAlign = Label.HorizontalAlign.CENTER;
          bl.verticalAlign = Label.VerticalAlign.CENTER;
          bl.color = Color.WHITE;
          var btn = btnNode.addComponent(Button);
          btn.target = btnNode;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.9;
          btn.node.on(Button.EventType.CLICK, function () {
            return _this4.hide();
          });
          this._emptyHint = hint;
        }

        /* ── 弹窗层 ── */;
        _proto._buildPopupLayer = function _buildPopupLayer(viewW, viewH) {
          var layer = new Node('PopupLayer');
          this.node.addChild(layer);
          layer.addComponent(UITransform).setContentSize(viewW, viewH);
          layer.active = false;
          this._popupLayer = layer;
        }

        /* ========== 数据 ========== */;
        _proto._refreshContent = function _refreshContent() {
          if (this._scrollContent) this._scrollContent.removeAllChildren();
          this._loadCompletedWorks();
        };
        _proto._loadCompletedWorks = function _loadCompletedWorks() {
          var _this5 = this;
          var doneEntries = [];
          for (var _iterator = _createForOfIteratorHelperLoose(LevelManifest), _step; !(_step = _iterator()).done;) {
            var entry = _step.value;
            if (StorageService.isLevelDone(entry.id)) doneEntries.push(entry);
          }
          if (this._emptyHint) this._emptyHint.active = doneEntries.length === 0;
          var _loop = function _loop() {
            var entry = _doneEntries[_i];
            BundleManager.loadPuzzle(entry.jsonPath).then(function (jsonAsset) {
              var _this5$_scrollContent;
              var puzzle = jsonAsset.json;
              var previewSF = _this5._createColorPreview(puzzle);
              var card = _this5._createWorkCard(entry.name, previewSF);
              (_this5$_scrollContent = _this5._scrollContent) == null || _this5$_scrollContent.addChild(card);
            })["catch"](function () {});
          };
          for (var _i = 0, _doneEntries = doneEntries; _i < _doneEntries.length; _i++) {
            _loop();
          }
        };
        _proto._createColorPreview = function _createColorPreview(puzzle) {
          var flat = BoardData.rleDecode(puzzle.pixels);
          var total = puzzle.gridSize * puzzle.gridSize;
          var paintedSet = new Set();
          for (var i = 0; i < total; i++) {
            var bi = i < flat.length ? flat[i] : -1;
            if (bi >= 0) paintedSet.add(i);
          }
          return PuzzlePreview.createSpriteFrame(puzzle, paintedSet);
        }

        /* ========== 卡片 ========== */;
        _proto._createWorkCard = function _createWorkCard(name, previewFrame) {
          var _this6 = this;
          var root = new Node("WorkCard_" + name);
          root.addComponent(UITransform).setContentSize(CARD_WIDTH, CARD_HEIGHT);
          var bg = new Node('Bg');
          root.addChild(bg);
          bg.addComponent(UITransform).setContentSize(CARD_WIDTH, CARD_HEIGHT);
          var bgSp = bg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.color = Color.WHITE;
          var preview = new Node('Preview');
          root.addChild(preview);
          preview.setPosition(0, (CARD_HEIGHT - PREVIEW_SIZE) / 2 - 10, 0);
          preview.addComponent(UITransform).setContentSize(PREVIEW_SIZE, PREVIEW_SIZE);
          var pvSp = preview.addComponent(Sprite);
          pvSp.sizeMode = Sprite.SizeMode.CUSTOM;
          pvSp.spriteFrame = previewFrame;
          var labelNode = new Node('Name');
          root.addChild(labelNode);
          labelNode.setPosition(0, -CARD_HEIGHT / 2 + 30, 0);
          labelNode.addComponent(UITransform).setContentSize(CARD_WIDTH, 40);
          var lab = labelNode.addComponent(Label);
          lab.string = name;
          lab.fontSize = 28;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = new Color(50, 50, 50, 255);
          var btn = root.addComponent(Button);
          btn.target = root;
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.95;
          btn.node.on(Button.EventType.CLICK, function () {
            return _this6._showPreviewPopup(name, previewFrame);
          });
          return root;
        }

        /* ========== 预览弹窗 ========== */;
        _proto._showPreviewPopup = function _showPreviewPopup(name, frame) {
          var _this7 = this;
          var layer = this._popupLayer;
          if (!layer) return;
          layer.removeAllChildren();
          layer.active = true;
          var vs = view.getVisibleSize();
          var sf = getWhitePixelSF();
          var CARD_PAD = 30;
          var LABEL_H = 50;
          var CLOSE_SIZE = 44;
          var imgSize = Math.min(vs.width, vs.height) * 0.7;
          var cardW = imgSize + CARD_PAD * 2;
          var cardH = imgSize + CARD_PAD * 2 + LABEL_H;

          /* ── 遮罩 ── */
          var overlay = new Node('Overlay');
          layer.addChild(overlay);
          overlay.addComponent(UITransform).setContentSize(vs.width, vs.height);
          var oSp = overlay.addComponent(Sprite);
          oSp.sizeMode = Sprite.SizeMode.CUSTOM;
          oSp.spriteFrame = sf;
          oSp.color = new Color(0, 0, 0, 128);
          var overlayOpacity = overlay.addComponent(UIOpacity);
          overlayOpacity.opacity = 0;
          var oBtn = overlay.addComponent(Button);
          oBtn.target = overlay;
          oBtn.transition = Button.Transition.NONE;
          oBtn.node.on(Button.EventType.CLICK, function () {
            return _this7._dismissPreviewPopup();
          });

          /* ── 卡片 ── */
          var card = new Node('Card');
          layer.addChild(card);
          card.addComponent(UITransform).setContentSize(cardW, cardH);
          var cardBg = new Node('CardBg');
          card.addChild(cardBg);
          cardBg.addComponent(UITransform).setContentSize(cardW, cardH);
          var cbgSp = cardBg.addComponent(Sprite);
          cbgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          cbgSp.spriteFrame = sf;
          cbgSp.color = Color.WHITE;

          /* ── ✕ 关闭按钮 ── */
          var closeNode = new Node('CloseBtn');
          card.addChild(closeNode);
          closeNode.setPosition(cardW / 2 - CLOSE_SIZE / 2 - 10, cardH / 2 - CLOSE_SIZE / 2 - 10, 0);
          closeNode.addComponent(UITransform).setContentSize(CLOSE_SIZE, CLOSE_SIZE);
          var closeLab = closeNode.addComponent(Label);
          closeLab.string = '✕';
          closeLab.fontSize = 28;
          closeLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          closeLab.verticalAlign = Label.VerticalAlign.CENTER;
          closeLab.color = new Color(160, 160, 160, 255);
          var closeBtn = closeNode.addComponent(Button);
          closeBtn.target = closeNode;
          closeBtn.transition = Button.Transition.SCALE;
          closeBtn.zoomScale = 0.85;
          closeBtn.node.on(Button.EventType.CLICK, function () {
            return _this7._dismissPreviewPopup();
          });

          /* ── 预览图 ── */
          var imgNode = new Node('Preview');
          card.addChild(imgNode);
          imgNode.setPosition(0, (cardH - imgSize) / 2 - CARD_PAD, 0);
          imgNode.addComponent(UITransform).setContentSize(imgSize, imgSize);
          var imgSp = imgNode.addComponent(Sprite);
          imgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          imgSp.spriteFrame = frame;

          /* ── 标题 ── */
          var titleNode = new Node('Title');
          card.addChild(titleNode);
          titleNode.setPosition(0, -cardH / 2 + LABEL_H / 2 + 8, 0);
          titleNode.addComponent(UITransform).setContentSize(cardW, LABEL_H);
          var titleLab = titleNode.addComponent(Label);
          titleLab.string = name;
          titleLab.fontSize = 32;
          titleLab.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLab.verticalAlign = Label.VerticalAlign.CENTER;
          titleLab.color = new Color(60, 60, 60, 255);

          /* ── 弹出动画 ── */
          var cardOpacity = card.addComponent(UIOpacity);
          cardOpacity.opacity = 0;
          card.setScale(0.85, 0.85, 1);
          tween(overlayOpacity).to(0.25, {
            opacity: 255
          }).start();
          tween(cardOpacity).to(0.25, {
            opacity: 255
          }).start();
          tween(card).to(0.25, {
            scale: new Vec3(1, 1, 1)
          }).start();
        };
        _proto._dismissPreviewPopup = function _dismissPreviewPopup() {
          var layer = this._popupLayer;
          if (!layer || !layer.active) return;
          var overlay = layer.getChildByName('Overlay');
          var card = layer.getChildByName('Card');
          if (!card) {
            layer.removeAllChildren();
            layer.active = false;
            return;
          }
          var overlayOp = overlay == null ? void 0 : overlay.getComponent(UIOpacity);
          var cardOp = card.getComponent(UIOpacity);
          var cleanup = function cleanup() {
            layer.removeAllChildren();
            layer.active = false;
          };
          if (overlayOp) tween(overlayOp).to(0.2, {
            opacity: 0
          }).start();
          if (cardOp) tween(cardOp).to(0.2, {
            opacity: 0
          }).start();
          tween(card).to(0.2, {
            scale: new Vec3(0.85, 0.85, 1)
          }).call(cleanup).start();
        };
        return MyWorksPage;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintExecutor.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fbc72Nf1ZpA4b/l6uXZ6tx9", "PaintExecutor", undefined);
      var PaintExecutor = exports('PaintExecutor', /*#__PURE__*/function () {
        /**
         * @param brushPixels  Brush 层像素（必须）
         * @param boardPixels  Board 层像素（Phase 2 传 null，Phase 5 再传）
         * @param digitPixels  Digit 层像素（Phase 2 传 null，Phase 5 再传）
         * @param boardData 盘面数据
         * @param brushState 画笔状态
         */
        function PaintExecutor(brushPixels, boardPixels, digitPixels, boardData, brushState) {
          this._brushPixels = void 0;
          this._boardData = void 0;
          this._boardPixels = void 0;
          this._digitPixels = void 0;
          this._brushState = void 0;
          /** 本次触摸生命周期内的涂色记录 */
          this.entries = [];
          /** 脏标记：有写入后为 true，flush 后重置 */
          this.brushDirty = false;
          this.boardDirty = false;
          this.digitDirty = false;
          this._brushPixels = brushPixels;
          this._boardPixels = boardPixels;
          this._digitPixels = digitPixels;
          this._boardData = boardData;
          this._brushState = brushState;
        }
        /** 每次 touchStart 时清空记录 */
        var _proto = PaintExecutor.prototype;
        _proto.clearEntries = function clearEntries() {
          this.entries.length = 0;
        };
        _proto.paintCells = function paintCells(cells) {
          var results = [];
          var palette = this._brushState.palette;
          for (var i = 0; i < cells.length; i++) {
            var _cells$i = cells[i],
              row = _cells$i.row,
              col = _cells$i.col,
              brushIndex = _cells$i.brushIndex;
            // 1. 查正确答案
            var correctIndex = this._boardData.getBrushIndex(row, col);
            // 2. 判断匹配
            var matched = correctIndex >= 0 && correctIndex === brushIndex;
            // 3. 获取颜色
            var _this$_brushState$get = this._brushState.getRGB(brushIndex),
              r = _this$_brushState$get[0],
              g = _this$_brushState$get[1],
              b = _this$_brushState$get[2];
            // 4. 写 Brush 层
            var a = matched ? 255 : 100;
            this._brushPixels.setPixel(row, col, r, g, b, a);
            this.brushDirty = true;
            // 5. 如果涂对了，清除 Board 层和 Digit 层对应像素
            if (matched) {
              if (this._boardPixels) {
                this._boardPixels.setPixel(row, col, 0, 0, 0, 0);
                this.boardDirty = true;
              }
              if (this._digitPixels) {
                this._digitPixels.setPixel(row, col, 0, 0, 0, 0);
                this.digitDirty = true;
              }
            }
            // 6. 记录
            this.entries.push({
              row: row,
              col: col,
              brushIndex: brushIndex,
              matched: matched
            });
            results.push(matched);
          }
          return results;
        }

        /** 重置 dirty 标记（flush 之后调用） */;
        _proto.resetDirty = function resetDirty() {
          this.brushDirty = false;
          this.boardDirty = false;
          this.digitDirty = false;
        };
        return PaintExecutor;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintRecord.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "52259pSn3ZG+L23oJGLg8tM", "PaintRecord", undefined);
      /** 内存中的涂色操作记录器，维护有序操作序列。 */
      var PaintRecord = exports('PaintRecord', /*#__PURE__*/function () {
        function PaintRecord() {
          this._history = [];
        }
        var _proto = PaintRecord.prototype;
        _proto.record = function record(row, col, brushIndex) {
          this._history.push({
            row: row,
            col: col,
            brushIndex: brushIndex
          });
        };
        _proto.getHistory = function getHistory() {
          return this._history;
        };
        _proto.clear = function clear() {
          this._history.length = 0;
        };
        _createClass(PaintRecord, [{
          key: "length",
          get: function get() {
            return this._history.length;
          }
        }]);
        return PaintRecord;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintRecordCodec.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "48edebKnWlAEps8u2YXw9w+", "PaintRecordCodec", undefined);
      /**
       * 涂色记录位压缩编解码。
       *
       * 21-bit 整数: row(7) | col(7) | brushIndex(7)
       * 支持最大 128×128 网格 + 128 色调色板。
       */
      var PaintRecordCodec = exports('PaintRecordCodec', /*#__PURE__*/function () {
        function PaintRecordCodec() {}
        PaintRecordCodec.encode = function encode(history) {
          var out = new Array(history.length);
          for (var i = 0; i < history.length; i++) {
            var e = history[i];
            out[i] = e.row << 14 | e.col << 7 | e.brushIndex;
          }
          return out;
        };
        PaintRecordCodec.decode = function decode(encoded) {
          var out = new Array(encoded.length);
          for (var i = 0; i < encoded.length; i++) {
            var v = encoded[i];
            out[i] = {
              row: v >> 14 & 0x7f,
              col: v >> 7 & 0x7f,
              brushIndex: v & 0x7f
            };
          }
          return out;
        };
        return PaintRecordCodec;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintRestore.ts", ['cc', './StorageService.ts'], function (exports) {
  var cclegacy, StorageService;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      StorageService = module.StorageService;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b9bd4fGZ5xHk5xJJZFaeLlw", "PaintRestore", undefined);

      /**
       * 冷启动恢复：读取本地存档，重建 paintMap + 像素缓冲 + 进度计数。
       *
       * 调用时机：BoardBootstrap.run() 创建 ctx 之后、refreshDetailVisibility 之前。
       */
      var PaintRestore = exports('PaintRestore', /*#__PURE__*/function () {
        function PaintRestore() {}
        PaintRestore.restore = function restore(ctx) {
          var sm = ctx.saveManager;
          var history = StorageService.loadPaintRecord(sm.levelId);
          if (!history.length) return;
          var boardData = ctx.boardData,
            brushLayer = ctx.brushLayer,
            digitLayer = ctx.digitLayer;
          var cols = boardData.gridCols;
          var total = cols * boardData.gridRows;
          var palette = boardData.palette;
          var brushBuf = brushLayer.pixelBuffer;
          var digitBuf = digitLayer.pixelBuffer;
          for (var i = 0; i < history.length; i++) {
            var _history$i = history[i],
              row = _history$i.row,
              col = _history$i.col,
              brushIndex = _history$i.brushIndex;
            var idx = row * cols + col;
            if (idx < 0 || idx >= total) continue;
            if (brushIndex < 0 || brushIndex >= palette.length) continue;
            sm.paintMap[idx] = brushIndex;
            sm.record.record(row, col, brushIndex);
            var hex = parseInt(palette[brushIndex].slice(1), 16);
            brushBuf.setPixel(row, col, hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff, 255);
            digitBuf.setPixel(row, col, 0, 0, 0, 0);
            if (sm.brushFilledCounts[brushIndex] < sm.brushTotalCounts[brushIndex]) {
              sm.brushFilledCounts[brushIndex]++;
            }
          }
          brushLayer.flush();
          digitLayer.flush();
        };
        return PaintRestore;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintSaveManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PaintRecord.ts', './StorageService.ts'], function (exports) {
  var _createClass, cclegacy, PaintRecord, StorageService;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PaintRecord = module.PaintRecord;
    }, function (module) {
      StorageService = module.StorageService;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5e324CyKf1MkaNt31DCjRyj", "PaintSaveManager", undefined);

      /**
       * 涂色存档管理器 — 拥有运行时 paintMap / 进度计数 / 操作记录。
       *
       * - commitMatchedEntries: 触摸结束时同步写入内存，调度防抖落盘。
       * - forceFlush: 退出关卡或全图完成时立即写盘。
       */
      var PaintSaveManager = exports('PaintSaveManager', /*#__PURE__*/function () {
        function PaintSaveManager(levelId, boardData) {
          this.levelId = void 0;
          this.paintMap = void 0;
          this.brushTotalCounts = void 0;
          this.brushFilledCounts = void 0;
          this.record = void 0;
          this._flushTimer = null;
          this._onAllComplete = null;
          this._onProgressChanged = null;
          this._onBrushComplete = null;
          this.levelId = levelId;
          this.record = new PaintRecord();
          var total = boardData.gridCols * boardData.gridRows;
          this.paintMap = new Array(total).fill(-1);
          var paletteLen = boardData.palette.length;
          this.brushTotalCounts = new Array(paletteLen).fill(0);
          this.brushFilledCounts = new Array(paletteLen).fill(0);
          for (var i = 0; i < total; i++) {
            var bi = boardData.cellData[i];
            if (bi >= 0 && bi < paletteLen) {
              this.brushTotalCounts[bi]++;
            }
          }
        }
        var _proto = PaintSaveManager.prototype;
        _proto.getProgress = function getProgress() {
          var filled = 0,
            total = 0;
          for (var i = 0; i < this.brushTotalCounts.length; i++) {
            total += this.brushTotalCounts[i];
            filled += this.brushFilledCounts[i];
          }
          return {
            filled: filled,
            total: total
          };
        }

        /**
         * 触摸结束后调用：将 PaintExecutor.entries 中 matched 的格子
         * 写入 paintMap + paintRecord，调度防抖落盘。
         */;
        _proto.commitMatchedEntries = function commitMatchedEntries(entries, gridCols) {
          var _this$_onProgressChan;
          var hasNew = false;
          var justCompleted = [];
          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if (!e.matched) continue;
            var idx = e.row * gridCols + e.col;
            if (this.paintMap[idx] >= 0) continue;
            this.paintMap[idx] = e.brushIndex;
            this.record.record(e.row, e.col, e.brushIndex);
            var bi = e.brushIndex;
            if (this.brushFilledCounts[bi] < this.brushTotalCounts[bi]) {
              this.brushFilledCounts[bi]++;
              if (this.brushFilledCounts[bi] === this.brushTotalCounts[bi]) {
                justCompleted.push(bi);
              }
            }
            hasNew = true;
          }
          if (!hasNew) return;
          for (var _i = 0; _i < justCompleted.length; _i++) {
            var _this$_onBrushComplet;
            (_this$_onBrushComplet = this._onBrushComplete) == null || _this$_onBrushComplet.call(this, justCompleted[_i]);
          }
          var p = this.getProgress();
          (_this$_onProgressChan = this._onProgressChanged) == null || _this$_onProgressChan.call(this, p.filled, p.total);
          this._scheduleFlush();
          if (this._isAllComplete()) {
            var _this$_onAllComplete;
            StorageService.markLevelDone(this.levelId);
            this.forceFlush();
            (_this$_onAllComplete = this._onAllComplete) == null || _this$_onAllComplete.call(this);
          }
        };
        _proto.forceFlush = function forceFlush() {
          this._cancelFlush();
          this._doFlush();
        }

        /* ── 内部 ── */;
        _proto._scheduleFlush = function _scheduleFlush() {
          var _this = this;
          this._cancelFlush();
          this._flushTimer = setTimeout(function () {
            _this._flushTimer = null;
            _this._doFlush();
          }, 1000);
        };
        _proto._cancelFlush = function _cancelFlush() {
          if (this._flushTimer !== null) {
            clearTimeout(this._flushTimer);
            this._flushTimer = null;
          }
        };
        _proto._doFlush = function _doFlush() {
          var history = this.record.getHistory();
          if (!history.length) return;
          StorageService.savePaintRecord(this.levelId, history);
        };
        _proto._isAllComplete = function _isAllComplete() {
          for (var i = 0; i < this.brushTotalCounts.length; i++) {
            if (this.brushTotalCounts[i] > 0 && this.brushFilledCounts[i] < this.brushTotalCounts[i]) {
              return false;
            }
          }
          return true;
        };
        _createClass(PaintSaveManager, [{
          key: "onAllComplete",
          set: function set(cb) {
            this._onAllComplete = cb;
          }
        }, {
          key: "onProgressChanged",
          set: function set(cb) {
            this._onProgressChanged = cb;
          }
        }, {
          key: "onBrushComplete",
          set: function set(cb) {
            this._onBrushComplete = cb;
          }
        }]);
        return PaintSaveManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaintSnapRules.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        cellFilled: cellFilled,
        cellHitAllowsDraw: cellHitAllowsDraw,
        collectPaintCellsDDA: collectPaintCellsDDA,
        filterPaintPathToBrush: filterPaintPathToBrush
      });
      cclegacy._RF.push({}, "c3f1aK4nQ5Bx6a1Lo99TBqQ", "PaintSnapRules", undefined);
      /**
       * 涂色命中与路径规则，对齐 G15_FBase：
       * PointerSnapPaintCell / CellHitTest / CollectPaintCells / PaintLogic 过滤逻辑
       */

      function cellFilled(board, brush, row, col) {
        if (board.isEmpty(row, col)) return true;
        return brush.getAlpha(row, col) === 255;
      }
      function cellCenterLocal(row, col, gridRows, totalW, totalH, cellW, cellH) {
        var cx = -totalW * 0.5 + (col + 0.5) * cellW;
        var cy = totalH * 0.5 - (gridRows - 1 - row + 0.5) * cellH;
        return {
          cx: cx,
          cy: cy
        };
      }
      function tryExpandHit(adjRow, adjCol, localX, localY, halfW, halfH, expand, gridRows, gridCols, totalW, totalH, cellW, cellH, brushIndex, board) {
        if (adjRow < 0 || adjRow >= gridRows || adjCol < 0 || adjCol >= gridCols) return null;
        if (board.getBrushIndex(adjRow, adjCol) !== brushIndex) return null;
        var _cellCenterLocal = cellCenterLocal(adjRow, adjCol, gridRows, totalW, totalH, cellW, cellH),
          cx = _cellCenterLocal.cx,
          cy = _cellCenterLocal.cy;
        if (localX < cx - halfW - expand) return null;
        if (localX > cx + halfW + expand) return null;
        if (localY < cy - halfH - expand) return null;
        if (localY > cy + halfH + expand) return null;
        return {
          row: adjRow,
          col: adjCol
        };
      }
      var PaintSnapSession = exports('PaintSnapSession', /*#__PURE__*/function () {
        function PaintSnapSession() {
          this._lastRawRow = -1;
          this._lastRawCol = -1;
          this._snappedOnRawCell = false;
        }
        var _proto = PaintSnapSession.prototype;
        _proto.reset = function reset() {
          this._lastRawRow = -1;
          this._lastRawCol = -1;
          this._snappedOnRawCell = false;
        }

        /**
         * G15 PointerSnapPaintCell：正确格直中；错误格四向扩展吸附未填正确格；滑动中缩小错误格命中盒
         */;
        _proto.snap = function snap(localX, localY, scale, brushIndex, gridCols, gridRows, cellW, cellH, board, brush, correctCellExpandPx, paintStarted) {
          var _this = this;
          if (!paintStarted) {
            this._snappedOnRawCell = false;
            this._lastRawRow = -1;
            this._lastRawCol = -1;
          }
          var totalW = gridCols * cellW;
          var totalH = gridRows * cellH;
          var col = Math.floor((localX + totalW * 0.5) / cellW);
          var row = gridRows - 1 - Math.floor((totalH * 0.5 - localY) / cellH);
          if (col < 0 || col >= gridCols || row < 0 || row >= gridRows) return null;
          if (row !== this._lastRawRow || col !== this._lastRawCol) {
            var wasSnapped = this._snappedOnRawCell;
            this._snappedOnRawCell = false;
            this._lastRawRow = row;
            this._lastRawCol = col;
            if (wasSnapped && !paintStarted && board.getBrushIndex(row, col) !== brushIndex) return null;
          }
          if (board.getBrushIndex(row, col) === brushIndex) return {
            row: row,
            col: col
          };
          var halfW = cellW * 0.5;
          var halfH = cellH * 0.5;
          var expandRaw = correctCellExpandPx / Math.max(scale, 0.0001);
          var expand = Math.min(expandRaw, halfW * 0.4, halfH * 0.4);
          var isExpandHit = false;
          var tryNeighbor = function tryNeighbor(adjRow, adjCol) {
            var p = tryExpandHit(adjRow, adjCol, localX, localY, halfW, halfH, expand, gridRows, gridCols, totalW, totalH, cellW, cellH, brushIndex, board);
            if (!p) return null;
            isExpandHit = true;
            if (!cellFilled(board, brush, p.row, p.col)) {
              _this._snappedOnRawCell = true;
              return p;
            }
            return null;
          };
          var nbs = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];
          for (var i = 0; i < nbs.length; i++) {
            var hit = tryNeighbor(nbs[i][0], nbs[i][1]);
            if (hit) return hit;
          }
          if (paintStarted && isExpandHit) {
            var _cellCenterLocal2 = cellCenterLocal(row, col, gridRows, totalW, totalH, cellW, cellH),
              cx = _cellCenterLocal2.cx,
              cy = _cellCenterLocal2.cy;
            var sL = cx - halfW + expand;
            var sR = cx + halfW - expand;
            var sB = cy - halfH + expand;
            var sT = cy + halfH - expand;
            if (sR <= sL || sT <= sB) return null;
            if (localX < sL || localX > sR || localY < sB || localY > sT) return null;
          }
          if (this._snappedOnRawCell) return null;
          return {
            row: row,
            col: col
          };
        };
        return PaintSnapSession;
      }());

      /**
       * G15 CollectPaintCells：Amanatides & Woo DDA；跳过空格、已填(alpha=255)；与 CellConverter 行列约定一致
       */
      function collectPaintCellsDDA(hasFrom, fromLocalX, fromLocalY, toLocalX, toLocalY, brushIndex, gridCols, gridRows, cellW, cellH, board, brush, out) {
        out.length = 0;
        var halfW = gridCols * cellW * 0.5;
        var halfH = gridRows * cellH * 0.5;
        var lx0 = hasFrom ? fromLocalX : toLocalX;
        var ly0 = hasFrom ? fromLocalY : toLocalY;
        var cf0 = (lx0 + halfW) / cellW;
        var rf0 = (halfH - ly0) / cellH;
        var cf1 = (toLocalX + halfW) / cellW;
        var rf1 = (halfH - toLocalY) / cellH;
        var col = Math.floor(cf0);
        var rowG = Math.floor(rf0);
        var endCol = Math.floor(cf1);
        var endRowG = Math.floor(rf1);
        var dc = cf1 - cf0;
        var dr = rf1 - rf0;
        var stepC = dc > 0 ? 1 : dc < 0 ? -1 : 0;
        var stepR = dr > 0 ? 1 : dr < 0 ? -1 : 0;
        var EPS = 1e-12;
        var absDc = Math.abs(dc);
        var absDr = Math.abs(dr);
        var tDeltaC = absDc > EPS ? 1 / absDc : 1e30;
        var tDeltaR = absDr > EPS ? 1 / absDr : 1e30;
        var tMaxC = stepC > 0 ? (col + 1 - cf0) * tDeltaC : stepC < 0 ? (cf0 - col) * tDeltaC : 1e30;
        var tMaxR = stepR > 0 ? (rowG + 1 - rf0) * tDeltaR : stepR < 0 ? (rf0 - rowG) * tDeltaR : 1e30;
        var tryPush = function tryPush(rG, c) {
          var r = gridRows - 1 - rG;
          if (r < 0 || r >= gridRows || c < 0 || c >= gridCols) return;
          for (var i = 0; i < out.length; i++) {
            if (out[i].row === r && out[i].col === c) return;
          }
          if (board.isEmpty(r, c)) return;
          if (brush.getAlpha(r, c) === 255) return;
          out.push({
            row: r,
            col: c,
            brushIndex: brushIndex
          });
        };
        tryPush(rowG, col);
        var maxSteps = Math.abs(endCol - col) + Math.abs(endRowG - rowG) + 2;
        for (var s = 0; (col !== endCol || rowG !== endRowG) && s < maxSteps; s++) {
          if (tMaxC < tMaxR) {
            col += stepC;
            tMaxC += tDeltaC;
          } else if (tMaxR < tMaxC) {
            rowG += stepR;
            tMaxR += tDeltaR;
          } else {
            col += stepC;
            rowG += stepR;
            tMaxC += tDeltaC;
            tMaxR += tDeltaR;
          }
          tryPush(rowG, col);
        }
        return out;
      }

      /** G15 PaintLogic：路径只保留与画笔索引一致的格，snap 目标格始终保留 */
      function filterPaintPathToBrush(pending, snapPos, board, brushIndex) {
        for (var i = pending.length - 1; i >= 0; i--) {
          var p = pending[i];
          if (board.getBrushIndex(p.row, p.col) !== brushIndex && (p.row !== snapPos.row || p.col !== snapPos.col)) {
            pending[i] = pending[pending.length - 1];
            pending.length--;
          }
        }
      }

      /** G15 CellHitTest：吸附到未填且答案与当前笔一致 */
      function cellHitAllowsDraw(pos, board, brush, brushIndex) {
        if (!pos) return false;
        if (cellFilled(board, brush, pos.row, pos.col)) return false;
        var idx = board.getBrushIndex(pos.row, pos.col);
        return idx >= 0 && idx === brushIndex;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PaletteInstaller.ts", ['cc', './ToolConfig.ts', './PalettePanel.ts', './ToolPanel.ts'], function (exports) {
  var cclegacy, view, Node, UITransform, Widget, Sprite, Color, Mask, MaskType, Vec3, tween, ToolType, PalettePanel, ToolPanel;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Widget = module.Widget;
      Sprite = module.Sprite;
      Color = module.Color;
      Mask = module.Mask;
      MaskType = module.MaskType;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      ToolType = module.ToolType;
    }, function (module) {
      PalettePanel = module.PalettePanel;
    }, function (module) {
      ToolPanel = module.ToolPanel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2c972fXyxhGv5BROyQgoObt", "PaletteInstaller", undefined);
      var INDICATOR_H = 32;
      var DOT_SIZE = 10;
      var DOT_GAP = 12;
      var DRAG_DETECT_PX = 8;
      var PaletteInstaller = exports('PaletteInstaller', /*#__PURE__*/function () {
        function PaletteInstaller() {}
        PaletteInstaller.install = function install(parent, palette, brushState, itemSprite, style, toolState, onToolClick) {
          var _style$columnsPerPage,
            _style$rowsPerPage,
            _style$swipeThreshold,
            _style$snapSpeed,
            _style$defaultPage,
            _this = this;
          var viewW = view.getVisibleSize().width;
          var ih = style.itemHeight;
          var spc = style.itemSpacing;
          var pad = style.padding;
          var cols = (_style$columnsPerPage = style.columnsPerPage) != null ? _style$columnsPerPage : 5;
          var rows = (_style$rowsPerPage = style.rowsPerPage) != null ? _style$rowsPerPage : 2;
          var swipeThreshold = (_style$swipeThreshold = style.swipeThreshold) != null ? _style$swipeThreshold : 50;
          var snapSpeed = (_style$snapSpeed = style.snapSpeed) != null ? _style$snapSpeed : 3000;
          var gridH = ih * rows + spc * Math.max(0, rows - 1);
          var paletteH = pad * 2 + gridH;
          var barH = paletteH + INDICATOR_H;
          var perPage = cols * rows;
          var colorPageCount = Math.max(1, Math.ceil(palette.length / perPage));
          var totalPages = 1 + colorPageCount;
          var defaultPage = Math.min((_style$defaultPage = style.defaultPage) != null ? _style$defaultPage : 1, totalPages - 1);

          // ── Bar (root) ──────────────────────────────────────────
          var bar = new Node('PaletteBar');
          parent.addChild(bar);
          bar.addComponent(UITransform).setContentSize(viewW, barH);
          var widget = bar.addComponent(Widget);
          widget.isAlignBottom = true;
          widget.isAlignLeft = true;
          widget.isAlignRight = true;
          widget.bottom = 0;
          widget.left = 0;
          widget.right = 0;
          widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
          var barBg = new Node('BarBg');
          bar.addChild(barBg);
          barBg.addComponent(UITransform).setContentSize(viewW, barH);
          var bgSp = barBg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.spriteFrame = itemSprite;
          bgSp.color = Color.WHITE;

          // ── Mask view ───────────────────────────────────────────
          var maskNode = new Node('MaskView');
          bar.addChild(maskNode);
          maskNode.setPosition(0, -INDICATOR_H / 2, 0);
          maskNode.addComponent(UITransform).setContentSize(viewW, paletteH);
          maskNode.addComponent(Mask).type = MaskType.GRAPHICS_RECT;

          // ── Content (carries all pages, position.x drives paging) ─
          var content = new Node('Content');
          maskNode.addChild(content);
          content.addComponent(UITransform).setContentSize(viewW * totalPages, paletteH);

          // ── Page 0: Tools ───────────────────────────────────────
          var toolHandle = ToolPanel.create(toolState, itemSprite, paletteH);
          content.addChild(toolHandle.node);
          toolHandle.node.setPosition(0, 0, 0);

          // ── Page 1+: Colors ─────────────────────────────────────
          var panel = bar.addComponent(PalettePanel);
          var opts = {
            itemWidth: style.itemWidth,
            itemHeight: style.itemHeight,
            itemSpacing: style.itemSpacing,
            padding: style.padding,
            labelFontSize: style.labelFontSize,
            ringColor: style.ringColor,
            ringOutset: style.ringOutset,
            itemRootOutset: style.itemRootOutset,
            useContrastLabel: style.useContrastLabel,
            labelColor: style.useContrastLabel ? null : style.labelFixedColor,
            onBrushIndexChanged: style.onBrushIndexChanged,
            columnsPerPage: cols,
            rowsPerPage: rows
          };
          var colorContainer = panel.setup(palette, brushState, itemSprite, opts);
          content.addChild(colorContainer);
          colorContainer.setPosition(viewW, 0, 0);

          // ── Page indicator dots ─────────────────────────────────
          var dots = this._buildDots(bar, barH, totalPages, defaultPage, itemSprite);

          // ── Paging state ────────────────────────────────────────
          var currentPage = defaultPage;
          var pageX = function pageX(p) {
            return -p * viewW;
          };
          content.setPosition(pageX(currentPage), 0, 0);
          panel.refreshVisibleSlots(pageX(currentPage));
          var activeTween = null;
          var navigateToPage = function navigateToPage(target, animated) {
            if (animated === void 0) {
              animated = true;
            }
            target = Math.max(0, Math.min(totalPages - 1, target));
            currentPage = target;
            _this._updateDots(dots, target);
            if (activeTween) {
              activeTween.stop();
              activeTween = null;
            }
            var tx = pageX(target);
            if (!animated) {
              content.setPosition(tx, 0, 0);
              panel.refreshVisibleSlots(tx);
              return;
            }
            var dist = Math.abs(content.position.x - tx);
            var dur = Math.max(0.1, dist / snapSpeed);
            activeTween = tween(content).to(dur, {
              position: new Vec3(tx, 0, 0)
            }, {
              onUpdate: function onUpdate() {
                return panel.refreshVisibleSlots(content.position.x);
              }
            }).call(function () {
              activeTween = null;
              panel.refreshVisibleSlots(content.position.x);
            }).start();
          };
          panel.onScrollToPage = function (colorIdx) {
            return navigateToPage(colorIdx + 1);
          };

          // ── Touch handling (single-finger, whole bar) ───────────
          var trackingId = null;
          var startX = 0;
          var swiping = false;
          var contentStartX = 0;
          bar.on(Node.EventType.TOUCH_START, function (ev) {
            var t = ev.touch;
            if (!t) return;
            if (trackingId !== null) return;
            trackingId = t.getID();
            if (activeTween) {
              activeTween.stop();
              activeTween = null;
            }
            var loc = ev.getUILocation();
            startX = loc.x;
            swiping = false;
            contentStartX = content.position.x;
          });
          bar.on(Node.EventType.TOUCH_MOVE, function (ev) {
            var t = ev.touch;
            if (!t || t.getID() !== trackingId) return;
            var loc = ev.getUILocation();
            var dx = loc.x - startX;
            if (!swiping && Math.abs(dx) > DRAG_DETECT_PX) swiping = true;
            if (!swiping) return;
            var nx = contentStartX + dx;
            var minX = pageX(totalPages - 1);
            var maxX = pageX(0);
            if (nx > maxX) nx = maxX + (nx - maxX) * 0.3;
            if (nx < minX) nx = minX + (nx - minX) * 0.3;
            content.setPosition(nx, 0, 0);
            panel.refreshVisibleSlots(nx);
          });
          var onEnd = function onEnd(ev) {
            var t = ev.touch;
            if (!t || t.getID() !== trackingId) return;
            trackingId = null;
            var dx = ev.getUILocation().x - startX;
            if (Math.abs(dx) >= swipeThreshold) {
              navigateToPage(dx < 0 ? currentPage + 1 : currentPage - 1);
            } else if (swiping) {
              navigateToPage(currentPage);
            } else {
              _this._handleTap(ev, content, currentPage, viewW, panel, toolHandle, onToolClick);
            }
          };
          bar.on(Node.EventType.TOUCH_END, onEnd);
          bar.on(Node.EventType.TOUCH_CANCEL, function (ev) {
            var t = ev.touch;
            if (!t || t.getID() !== trackingId) return;
            trackingId = null;
            navigateToPage(currentPage);
          });
          return panel;
        }

        // ── Tap hit-test ────────────────────────────────────────────
        ;

        PaletteInstaller._handleTap = function _handleTap(ev, content, currentPage, viewW, panel, toolHandle, onToolClick) {
          var loc = ev.getUILocation();
          var contentUt = content.getComponent(UITransform);
          var cl = contentUt.convertToNodeSpaceAR(new Vec3(loc.x, loc.y, 0));
          var pageNodeX = currentPage * viewW;
          var plx = cl.x - pageNodeX;
          var ply = cl.y;
          if (currentPage === 0) {
            var _type = toolHandle.hitTest(plx, ply);
            if (_type !== ToolType.None) onToolClick(_type);
          } else {
            var idx = panel.hitTest(currentPage - 1, plx, ply);
            if (idx >= 0) panel.select(idx);
          }
        }

        // ── Dot indicator ───────────────────────────────────────────
        ;

        PaletteInstaller._buildDots = function _buildDots(bar, barH, total, active, sf) {
          var container = new Node('PageIndicator');
          bar.addChild(container);
          container.setPosition(0, barH / 2 - INDICATOR_H / 2, 0);
          var totalW = total * DOT_SIZE + (total - 1) * DOT_GAP;
          container.addComponent(UITransform).setContentSize(totalW, INDICATOR_H);
          var dots = [];
          for (var i = 0; i < total; i++) {
            var x = -totalW / 2 + DOT_SIZE / 2 + i * (DOT_SIZE + DOT_GAP);
            var dn = new Node("Dot_" + i);
            container.addChild(dn);
            dn.setPosition(x, 0, 0);
            dn.addComponent(UITransform).setContentSize(DOT_SIZE, DOT_SIZE);
            var sp = dn.addComponent(Sprite);
            sp.sizeMode = Sprite.SizeMode.CUSTOM;
            sp.spriteFrame = sf;
            sp.color = i === active ? new Color(60, 60, 60, 255) : new Color(200, 200, 200, 255);
            dots.push(sp);
          }
          return dots;
        };
        PaletteInstaller._updateDots = function _updateDots(dots, active) {
          var on = new Color(60, 60, 60, 255);
          var off = new Color(200, 200, 200, 255);
          for (var i = 0; i < dots.length; i++) dots[i].color = i === active ? on : off;
        };
        return PaletteInstaller;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PalettePanel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Color, view, Node, UITransform, Sprite, Label, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "4799bpXCedKmqVcuwmE6Qez", "PalettePanel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var POOL_SIZE = 12; // 2×5 + 2 transition buffer

      /**
       * 调色板 — 虚拟列表 + Sprite/Label 分层。
       *
       * - 对象池固定 12 slot，按可见区域动态绑定/回收。
       * - Ring/Bg 在 SpriteLayer，Label 在 LabelLayer，同纹理连续排列最大化合批。
       * - 水平均匀分布：边距 = 间距，自动计算。
       */
      var PalettePanel = exports('PalettePanel', (_dec = ccclass('PalettePanel'), _dec2 = property({
        displayName: '色块显示宽',
        tooltip: '底图像素可任意（如 2×2），此处为屏幕上宽度'
      }), _dec3 = property({
        displayName: '色块显示高'
      }), _dec4 = property({
        displayName: '色块间距'
      }), _dec5 = property({
        displayName: '内边距'
      }), _dec6 = property({
        displayName: '序号字号'
      }), _dec7 = property({
        type: Color,
        displayName: '选中描边颜色'
      }), _dec8 = property({
        displayName: '描边外扩(px/边)'
      }), _dec9 = property({
        displayName: '格子根节点外扩(px/边)'
      }), _dec10 = property({
        displayName: '序号自动对比色'
      }), _dec11 = property({
        type: Color,
        displayName: '序号固定色',
        visible: function visible() {
          return !this.useContrastLabel;
        }
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PalettePanel, _Component);
        function PalettePanel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "itemWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemHeight", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemSpacing", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "padding", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelFontSize", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ringColor", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ringOutset", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "itemRootOutset", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "useContrastLabel", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "labelFixedColor", _descriptor10, _assertThisInitialized(_this));
          _this._brushState = null;
          _this._palette = [];
          _this._selectedIndex = 0;
          _this._completedSet = new Set();
          _this._onBrushIndexChanged = null;
          _this._cols = 5;
          _this._rows = 2;
          _this._iw = 100;
          _this._ih = 100;
          _this._vSpc = 12;
          _this._hGap = 60;
          _this._fontSz = 28;
          _this._gridH = 0;
          _this._rootO = 6;
          _this._ringO = 4;
          _this._viewW = 960;
          _this._ringCol = new Color(48, 48, 48, 255);
          _this._useContrast = true;
          _this._labelFixed = null;
          _this._container = null;
          _this._slots = [];
          _this._freeSlots = [];
          _this._boundMap = new Map();
          /** PaletteInstaller 设置：自动选色导致翻页时回调（参数为色块页索引，0-based） */
          _this.onScrollToPage = null;
          return _this;
        }
        var _proto = PalettePanel.prototype;
        /**
         * 创建虚拟列表容器（SpriteLayer + LabelLayer），返回单个 Node。
         * 调用后需 refreshVisibleSlots() 激活首屏 slot。
         */
        _proto.setup = function setup(palette, brushState, itemFrame, options) {
          var _options$onBrushIndex, _options$itemWidth, _options$itemHeight, _options$itemSpacing, _options$labelFontSiz, _options$ringColor, _options$ringOutset, _options$itemRootOuts, _options$useContrastL, _options$labelColor, _options$columnsPerPa, _options$rowsPerPage;
          this._brushState = brushState;
          this._palette = palette;
          this._onBrushIndexChanged = (_options$onBrushIndex = options == null ? void 0 : options.onBrushIndexChanged) != null ? _options$onBrushIndex : null;
          this._completedSet = new Set();
          var iw = this._iw = (_options$itemWidth = options == null ? void 0 : options.itemWidth) != null ? _options$itemWidth : this.itemWidth;
          var ih = this._ih = (_options$itemHeight = options == null ? void 0 : options.itemHeight) != null ? _options$itemHeight : this.itemHeight;
          var vSpc = this._vSpc = (_options$itemSpacing = options == null ? void 0 : options.itemSpacing) != null ? _options$itemSpacing : this.itemSpacing;
          this._fontSz = (_options$labelFontSiz = options == null ? void 0 : options.labelFontSize) != null ? _options$labelFontSiz : this.labelFontSize;
          this._ringCol = ((_options$ringColor = options == null ? void 0 : options.ringColor) != null ? _options$ringColor : this.ringColor).clone();
          this._ringO = (_options$ringOutset = options == null ? void 0 : options.ringOutset) != null ? _options$ringOutset : this.ringOutset;
          this._rootO = (_options$itemRootOuts = options == null ? void 0 : options.itemRootOutset) != null ? _options$itemRootOuts : this.itemRootOutset;
          this._useContrast = (_options$useContrastL = options == null ? void 0 : options.useContrastLabel) != null ? _options$useContrastL : this.useContrastLabel;
          this._labelFixed = (_options$labelColor = options == null ? void 0 : options.labelColor) != null ? _options$labelColor : this._useContrast ? null : this.labelFixedColor;
          var cols = this._cols = (_options$columnsPerPa = options == null ? void 0 : options.columnsPerPage) != null ? _options$columnsPerPa : 5;
          var rows = this._rows = (_options$rowsPerPage = options == null ? void 0 : options.rowsPerPage) != null ? _options$rowsPerPage : 2;
          var viewW = this._viewW = view.getVisibleSize().width;
          this._hGap = (viewW - cols * iw) / (cols + 1);
          this._gridH = ih * rows + vSpc * Math.max(0, rows - 1);
          var perPage = cols * rows;
          var pageCount = Math.ceil(palette.length / perPage) || 1;
          var totalW = pageCount * viewW;
          var container = new Node('ColorContainer');
          container.addComponent(UITransform).setContentSize(totalW, this._gridH);
          this._container = container;
          var spriteLayer = new Node('SpriteLayer');
          container.addChild(spriteLayer);
          spriteLayer.addComponent(UITransform).setContentSize(totalW, this._gridH);
          var labelLayer = new Node('LabelLayer');
          container.addChild(labelLayer);
          labelLayer.addComponent(UITransform).setContentSize(totalW, this._gridH);
          this._slots = [];
          this._freeSlots = [];
          this._boundMap = new Map();
          for (var s = 0; s < POOL_SIZE; s++) {
            var slot = this._createSlot(spriteLayer, labelLayer, itemFrame, s);
            slot.ringNode.active = false;
            slot.bgNode.active = false;
            slot.labNode.active = false;
            this._slots.push(slot);
            this._freeSlots.push(slot);
          }
          this._selectedIndex = brushState.currentIndex;
          return container;
        }

        /**
         * 根据 Content.position.x 刷新可见 slot。
         * 每次 Content 位置变化（翻页/拖拽/动画帧）都应调用。
         */;
        _proto.refreshVisibleSlots = function refreshVisibleSlots(contentPosX) {
          if (!this._container) return;
          var viewW = this._viewW;
          var iw = this._iw;
          var containerOX = this._container.position.x;
          var visLeft = -contentPosX - viewW / 2 - containerOX;
          var visRight = -contentPosX + viewW / 2 - containerOX;
          var perPage = this._cols * this._rows;
          var pageCount = Math.ceil(this._palette.length / perPage) || 1;
          var visibleSet = new Set();
          for (var p = 0; p < pageCount; p++) {
            var pc = p * viewW;
            if (pc + viewW / 2 < visLeft || pc - viewW / 2 > visRight) continue;
            var start = p * perPage;
            var end = Math.min(start + perPage, this._palette.length);
            for (var _i = start; _i < end; _i++) {
              var col = (_i - start) % this._cols;
              var cx = this._colX(pc, col);
              if (cx + iw / 2 >= visLeft && cx - iw / 2 <= visRight) {
                visibleSet.add(_i);
              }
            }
          }
          for (var _iterator = _createForOfIteratorHelperLoose(this._slots), _step; !(_step = _iterator()).done;) {
            var slot = _step.value;
            if (slot.boundIndex >= 0 && !visibleSet.has(slot.boundIndex)) {
              this._unbindSlot(slot);
            }
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(visibleSet), _step2; !(_step2 = _iterator2()).done;) {
            var idx = _step2.value;
            if (!this._boundMap.has(idx)) {
              var _slot = this._freeSlots.pop();
              if (!_slot) break;
              this._bindSlot(_slot, idx);
            }
          }
        }

        /** 命中测试：纯数学，不依赖物理节点 */;
        _proto.hitTest = function hitTest(colorPageIndex, localX, localY) {
          var iw = this._iw;
          var ih = this._ih;
          var halfRW = (iw + this._rootO * 2) / 2;
          var halfRH = (ih + this._rootO * 2) / 2;
          var perPage = this._cols * this._rows;
          var start = colorPageIndex * perPage;
          var end = Math.min(start + perPage, this._palette.length);
          for (var _i2 = start; _i2 < end; _i2++) {
            var li = _i2 - start;
            var col = li % this._cols;
            var row = Math.floor(li / this._cols);
            var cx = this._colX(0, col);
            var cy = this._rowY(row);
            if (localX >= cx - halfRW && localX <= cx + halfRW && localY >= cy - halfRH && localY <= cy + halfRH) {
              return _i2;
            }
          }
          return -1;
        };
        _proto.getPageForIndex = function getPageForIndex(index) {
          return Math.floor(index / (this._cols * this._rows));
        };
        _proto.select = function select(index) {
          var _this$_onBrushIndexCh, _this$onScrollToPage;
          if (!this._brushState) return;
          if (this._completedSet.has(index)) return;
          if (index < 0 || index >= this._palette.length) return;
          var prevPage = this.getPageForIndex(this._selectedIndex);
          this._brushState.currentIndex = index;
          this._selectedIndex = index;
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._boundMap), _step3; !(_step3 = _iterator3()).done;) {
            var _step3$value = _step3.value,
              bIdx = _step3$value[0],
              slot = _step3$value[1];
            slot.ringNode.active = bIdx === index;
          }
          (_this$_onBrushIndexCh = this._onBrushIndexChanged) == null || _this$_onBrushIndexCh.call(this);
          var newPage = this.getPageForIndex(index);
          if (newPage !== prevPage) (_this$onScrollToPage = this.onScrollToPage) == null || _this$onScrollToPage.call(this, newPage);
        };
        _proto.markBrushComplete = function markBrushComplete(brushIndex) {
          if (brushIndex < 0 || brushIndex >= this._palette.length) return;
          this._completedSet.add(brushIndex);
          var slot = this._boundMap.get(brushIndex);
          if (slot) {
            slot.lab.string = '✓';
            slot.lab.fontSize = 36;
          }
        };
        _proto.autoSelectNextUnfinished = function autoSelectNextUnfinished(completedIndex, isComplete) {
          if (this._selectedIndex !== completedIndex) return;
          var len = this._palette.length;
          for (var offset = 1; offset < len; offset++) {
            var idx = (completedIndex + offset) % len;
            if (!isComplete(idx)) {
              this.select(idx);
              return;
            }
          }
        }

        // ── Layout helpers ───────────────────────────────────

        /** item center x in container space (even distribution) */;
        _proto._colX = function _colX(pageCenterX, col) {
          return pageCenterX - this._viewW / 2 + this._hGap * (col + 1) + this._iw * (col + 0.5);
        }

        /** item center y in container space */;
        _proto._rowY = function _rowY(row) {
          return this._gridH / 2 - this._ih / 2 - row * (this._ih + this._vSpc);
        }

        // ── Pool management ──────────────────────────────────
        ;

        _proto._createSlot = function _createSlot(spriteLayer, labelLayer, frame, idx) {
          var iw = this._iw;
          var ih = this._ih;
          var ringW = iw + this._ringO * 2;
          var ringH = ih + this._ringO * 2;
          var ringNode = new Node("Ring_" + idx);
          spriteLayer.addChild(ringNode);
          ringNode.addComponent(UITransform).setContentSize(ringW, ringH);
          var ringSp = ringNode.addComponent(Sprite);
          this._spriteCustomSize(ringSp, frame, ringW, ringH);
          ringSp.color = this._ringCol.clone();
          var bgNode = new Node("Bg_" + idx);
          spriteLayer.addChild(bgNode);
          bgNode.addComponent(UITransform).setContentSize(iw, ih);
          var bgSp = bgNode.addComponent(Sprite);
          this._spriteCustomSize(bgSp, frame, iw, ih);
          var labNode = new Node("Lab_" + idx);
          labelLayer.addChild(labNode);
          labNode.addComponent(UITransform).setContentSize(iw, ih);
          var lab = labNode.addComponent(Label);
          lab.fontSize = this._fontSz;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          return {
            ringNode: ringNode,
            bgNode: bgNode,
            labNode: labNode,
            ringSp: ringSp,
            bgSp: bgSp,
            lab: lab,
            boundIndex: -1
          };
        };
        _proto._bindSlot = function _bindSlot(slot, index) {
          var _this$_labelFixed;
          var perPage = this._cols * this._rows;
          var page = Math.floor(index / perPage);
          var li = index - page * perPage;
          var col = li % this._cols;
          var row = Math.floor(li / this._cols);
          var x = this._colX(page * this._viewW, col);
          var y = this._rowY(row);
          slot.ringNode.setPosition(x, y, 0);
          slot.bgNode.setPosition(x, y, 0);
          slot.labNode.setPosition(x, y, 0);
          var bgColor = this._hexToColor(this._palette[index]);
          slot.bgSp.color = bgColor;
          if (this._completedSet.has(index)) {
            slot.lab.string = '✓';
            slot.lab.fontSize = 36;
          } else {
            slot.lab.string = String(index + 1);
            slot.lab.fontSize = this._fontSz;
          }
          slot.lab.color = ((_this$_labelFixed = this._labelFixed) != null ? _this$_labelFixed : this._contrastLabelColor(bgColor)).clone();
          slot.ringNode.active = index === this._selectedIndex;
          slot.bgNode.active = true;
          slot.labNode.active = true;
          slot.boundIndex = index;
          this._boundMap.set(index, slot);
        };
        _proto._unbindSlot = function _unbindSlot(slot) {
          this._boundMap["delete"](slot.boundIndex);
          slot.boundIndex = -1;
          slot.ringNode.active = false;
          slot.bgNode.active = false;
          slot.labNode.active = false;
          this._freeSlots.push(slot);
        }

        // ── Utility ──────────────────────────────────────────
        ;

        _proto._spriteCustomSize = function _spriteCustomSize(sprite, frame, w, h) {
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.SIMPLE;
          sprite.spriteFrame = frame;
          sprite.node.getComponent(UITransform).setContentSize(w, h);
        };
        _proto._hexToColor = function _hexToColor(hex) {
          var s = hex.trim();
          if (s.startsWith('#')) s = s.slice(1);
          var n = parseInt(s, 16);
          if (Number.isNaN(n) || s.length < 6) return new Color(136, 136, 136, 255);
          return new Color(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 255);
        };
        _proto._contrastLabelColor = function _contrastLabelColor(bg) {
          var r = bg.r / 255,
            g = bg.g / 255,
            b = bg.b / 255;
          var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          return lum > 0.55 ? new Color(30, 30, 30, 255) : new Color(255, 255, 255, 255);
        };
        _createClass(PalettePanel, [{
          key: "selectedIndex",
          get: function get() {
            return this._selectedIndex;
          }
        }]);
        return PalettePanel;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemWidth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemHeight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemSpacing", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 12;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "padding", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 14;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelFontSize", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 28;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ringColor", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(48, 48, 48, 255);
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ringOutset", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "itemRootOutset", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "useContrastLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "labelFixedColor", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 255, 255, 255);
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PixelBuffer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "20efehiT5tJpIhZkkL6hgRD", "PixelBuffer", undefined);
      /** 像素缓冲区封装：统一管理 PixelBuffer 数据 */

      var PixelBuffer = exports('PixelBuffer', /*#__PURE__*/function () {
        function PixelBuffer(width, height) {
          this._data = void 0;
          this._width = void 0;
          this._height = void 0;
          this._data = new Uint8Array(width * height * 4);
          this._width = width;
          this._height = height;
        }

        /** 填充所有像素为指定颜色 */
        var _proto = PixelBuffer.prototype;
        _proto.fill = function fill(r, g, b, a) {
          for (var i = 0; i < this._data.length; i += 4) {
            this._data[i] = r;
            this._data[i + 1] = g;
            this._data[i + 2] = b;
            this._data[i + 3] = a;
          }
        }
        /** 设置单个像素的 RGBA */;
        _proto.setPixel = function setPixel(row, col, r, g, b, a) {
          var idx = this._index(row, col);
          this._data[idx] = r;
          this._data[idx + 1] = g;
          this._data[idx + 2] = b;
          this._data[idx + 3] = a;
        }

        /** 获取单个像素的 RGBA */;
        _proto.getPixel = function getPixel(row, col) {
          var idx = this._index(row, col);
          return {
            r: this._data[idx],
            g: this._data[idx + 1],
            b: this._data[idx + 2],
            a: this._data[idx + 3]
          };
        }

        /** 获取单个像素的 alpha 值 */;
        _proto.getAlpha = function getAlpha(row, col) {
          var idx = this._index(row, col) + 3;
          return this._data[idx];
        }

        /** 获取单个像素的 R 值 */;
        _proto.getR = function getR(row, col) {
          var idx = this._index(row, col);
          return this._data[idx];
        }

        /**
         * 行列 → 字节偏移量。
         * 约定：row 0 = 画面底部（Y-up，与 Cocos Creator / CellConverter 一致）。
         * JSON pixels RLE、BoardData.cellData 均遵循此约定。
         */;
        _proto._index = function _index(row, col) {
          return (row * this._width + col) * 4;
        }

        /**
         * 行序翻转后的副本，供 Texture2D.uploadData。
         * Cocos uploadData 首行 = 纹理顶部；逻辑 row 0 = 画面底部，
         * 翻转后 row(height-1) 排首位 → 纹理顶部 = 画面顶部。
         */;
        _proto.getFlippedData = function getFlippedData() {
          var flipped = new Uint8Array(this._data.length);
          var rowBytes = this._width * 4;
          for (var r = 0; r < this._height; r++) {
            var src = r * rowBytes;
            var dst = (this._height - 1 - r) * rowBytes;
            flipped.set(this._data.subarray(src, src + rowBytes), dst);
          }
          return flipped;
        }

        /** 逻辑行主序原始数据（row0=顶部）；上传 GPU 请用 getFlippedData() */;
        _createClass(PixelBuffer, [{
          key: "data",
          get: function get() {
            return this._data;
          }
        }]);
        return PixelBuffer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProgressBar.ts", ['cc'], function (exports) {
  var cclegacy, Color, Node, UITransform, Sprite, Label;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Label = module.Label;
    }],
    execute: function () {
      cclegacy._RF.push({}, "71f4720L2JO8qces9ZS6tXl", "ProgressBar", undefined);
      var BAR_H = 16;
      var BG_COLOR = new Color(220, 220, 220, 255);
      var FILL_COLOR = new Color(76, 175, 80, 255);
      var TEXT_COLOR = new Color(60, 60, 60, 255);
      var FONT_SIZE = 24;
      var ProgressBar = exports('ProgressBar', /*#__PURE__*/function () {
        function ProgressBar() {}
        ProgressBar.create = function create(parent, viewW, topY) {
          var barW = viewW * 0.45;
          var root = new Node('ProgressBar');
          parent.addChild(root);
          root.setPosition(0, topY, 0);
          var bg = new Node('Bg');
          root.addChild(bg);
          var bgUt = bg.addComponent(UITransform);
          bgUt.setContentSize(barW, BAR_H);
          var bgSp = bg.addComponent(Sprite);
          bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
          bgSp.color = BG_COLOR;
          var fill = new Node('Fill');
          bg.addChild(fill);
          var fillUt = fill.addComponent(UITransform);
          fillUt.setContentSize(0, BAR_H);
          fillUt.setAnchorPoint(0, 0.5);
          fill.setPosition(-barW / 2, 0, 0);
          var fillSp = fill.addComponent(Sprite);
          fillSp.sizeMode = Sprite.SizeMode.CUSTOM;
          fillSp.color = FILL_COLOR;
          var labelNode = new Node('Percent');
          root.addChild(labelNode);
          labelNode.setPosition(barW / 2 + 40, 0, 0);
          labelNode.addComponent(UITransform).setContentSize(80, BAR_H + 10);
          var lab = labelNode.addComponent(Label);
          lab.string = '0%';
          lab.fontSize = FONT_SIZE;
          lab.horizontalAlign = Label.HorizontalAlign.LEFT;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = TEXT_COLOR;
          return {
            update: function update(filled, total) {
              var ratio = total > 0 ? filled / total : 0;
              fillUt.setContentSize(barW * ratio, BAR_H);
              lab.string = Math.round(ratio * 100) + "%";
            }
          };
        };
        return ProgressBar;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PuzzlePreview.ts", ['cc', './BoardData.ts'], function (exports) {
  var cclegacy, ImageAsset, Texture2D, SpriteFrame, BoardData;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      ImageAsset = module.ImageAsset;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      BoardData = module.BoardData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ec0c9o8TkVL1ofIA1ptxyxB", "PuzzlePreview", undefined);

      /**
       * PuzzleData → 缩略图 SpriteFrame。
       *
       * 默认灰度模式（与 BoardLayer 同算法）：hexToGray → 映射到 90~200 区间。
       * 传入 paintedSet 时，已涂对的格子叠真实颜色，其余保持灰度。
       */
      var PuzzlePreview = exports('PuzzlePreview', /*#__PURE__*/function () {
        function PuzzlePreview() {}
        /**
         * @param puzzle    谜题数据
         * @param paintedSet 已正确涂色的 flat index 集合（可选，后续存档功能用）
         */
        PuzzlePreview.createSpriteFrame = function createSpriteFrame(puzzle, paintedSet) {
          var size = puzzle.gridSize;
          var flat = BoardData.rleDecode(puzzle.pixels);
          var total = size * size;
          var rgba = new Uint8Array(total * 4);
          for (var i = 0; i < total; i++) {
            var brushIdx = i < flat.length ? flat[i] : -1;
            var off = i * 4;
            if (brushIdx < 0 || brushIdx >= puzzle.palette.length) {
              rgba[off] = rgba[off + 1] = rgba[off + 2] = rgba[off + 3] = 0;
              continue;
            }
            var hex = puzzle.palette[brushIdx];
            if (paintedSet && paintedSet.has(i)) {
              rgba[off] = parseInt(hex.slice(1, 3), 16);
              rgba[off + 1] = parseInt(hex.slice(3, 5), 16);
              rgba[off + 2] = parseInt(hex.slice(5, 7), 16);
            } else {
              var gray = BoardData.hexToGray(hex);
              var v = Math.round(90 + gray / 255 * 110);
              rgba[off] = rgba[off + 1] = rgba[off + 2] = v;
            }
            rgba[off + 3] = 255;
          }
          var flipped = new Uint8Array(total * 4);
          var stride = size * 4;
          for (var r = 0; r < size; r++) {
            flipped.set(rgba.subarray((size - 1 - r) * stride, (size - r) * stride), r * stride);
          }
          var img = new ImageAsset({
            _data: flipped,
            _compressed: false,
            width: size,
            height: size,
            format: Texture2D.PixelFormat.RGBA8888
          });
          var tex = new Texture2D();
          tex.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
          tex.image = img;
          var sf = new SpriteFrame();
          sf.texture = tex;
          return sf;
        };
        return PuzzlePreview;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReplayAnimator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Texture2D, SpriteFrame, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "f9189Hs4dNMapQHjFKmWezP", "ReplayAnimator", undefined);
      var ccclass = _decorator.ccclass;
      var TARGET_FPS = 60;

      /**
       * 涂色回放动画 — 按玩家真实涂色顺序逐帧重现。
       *
       * 对标 G15 SettlementReplayLogic：
       * buffer 初始全白 fill(255)，逐帧写入真实颜色，推送到 Texture2D。
       */
      var ReplayAnimator = exports('ReplayAnimator', (_dec = ccclass('ReplayAnimator'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ReplayAnimator, _Component);
        function ReplayAnimator() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._rgba = null;
          _this._tex = null;
          _this._gridSize = 0;
          _this._palette = [];
          _this._history = [];
          _this._cellsPerFrame = 1;
          _this._cursor = 0;
          _this._playing = false;
          _this._onComplete = null;
          return _this;
        }
        var _proto = ReplayAnimator.prototype;
        /**
         * 初始化回放：buffer 先写入完整彩色图（fade-in 期间可见），
         * 待 play() 调用时清白并逐帧重建。对标 G15 SettlementCreateFunction。
         */
        _proto.setup = function setup(puzzle, history, sprite, onComplete, replayDurationSec) {
          this._gridSize = puzzle.gridSize;
          this._palette = puzzle.palette;
          this._history = history;
          this._onComplete = onComplete;
          var size = this._gridSize;
          this._rgba = new Uint8Array(size * size * 4).fill(255);
          for (var _iterator = _createForOfIteratorHelperLoose(history), _step; !(_step = _iterator()).done;) {
            var entry = _step.value;
            this._writeCell(entry);
          }
          this._tex = new Texture2D();
          this._tex.reset({
            width: size,
            height: size,
            format: Texture2D.PixelFormat.RGBA8888
          });
          this._tex.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
          this._tex.uploadData(this._rgba);
          var sf = new SpriteFrame();
          sf.texture = this._tex;
          sprite.spriteFrame = sf;
          var totalFrames = replayDurationSec * TARGET_FPS;
          this._cellsPerFrame = Math.max(1, Math.ceil(history.length / totalFrames));
        };
        _proto.play = function play() {
          this._cursor = 0;
          this._rgba.fill(255);
          this._uploadFull();
          this._playing = true;
        };
        _proto.update = function update(_dt) {
          if (!this._playing) return;
          var end = Math.min(this._cursor + this._cellsPerFrame, this._history.length);
          for (var i = this._cursor; i < end; i++) {
            this._writeCell(this._history[i]);
          }
          this._cursor = end;
          this._uploadFull();
          if (this._cursor >= this._history.length) {
            var _this$_onComplete;
            this._playing = false;
            (_this$_onComplete = this._onComplete) == null || _this$_onComplete.call(this);
          }
        }

        /* ── 内部 ── */;
        _proto._writeCell = function _writeCell(entry) {
          var size = this._gridSize;
          var flippedRow = size - 1 - entry.row;
          var off = (flippedRow * size + entry.col) * 4;
          var hex = this._palette[entry.brushIndex];
          if (!hex) return;
          var v = parseInt(hex.slice(1), 16);
          this._rgba[off] = v >> 16 & 0xff;
          this._rgba[off + 1] = v >> 8 & 0xff;
          this._rgba[off + 2] = v & 0xff;
          this._rgba[off + 3] = 255;
        };
        _proto._uploadFull = function _uploadFull() {
          this._tex.uploadData(this._rgba);
        };
        _createClass(ReplayAnimator, [{
          key: "playing",
          get: function get() {
            return this._playing;
          }
        }]);
        return ReplayAnimator;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageService.ts", ['cc', './PaintRecordCodec.ts'], function (exports) {
  var cclegacy, sys, PaintRecordCodec;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      PaintRecordCodec = module.PaintRecordCodec;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c2982uB459LG7H/VHrDYrMn", "StorageService", undefined);
      var RECORD_PREFIX = 'pa_rec_';
      var DONE_KEY = 'pa_done';
      var TOOL_KEY = 'pa_tool_counts';
      var StorageService = exports('StorageService', /*#__PURE__*/function () {
        function StorageService() {}
        /* ── 涂色记录 ── */
        StorageService.savePaintRecord = function savePaintRecord(levelId, history) {
          var data = {
            v: 1,
            r: PaintRecordCodec.encode(history),
            t: Date.now()
          };
          sys.localStorage.setItem(RECORD_PREFIX + levelId, JSON.stringify(data));
        };
        StorageService.loadPaintRecord = function loadPaintRecord(levelId) {
          var raw = sys.localStorage.getItem(RECORD_PREFIX + levelId);
          if (!raw) return [];
          try {
            var saved = JSON.parse(raw);
            if (saved && Array.isArray(saved.r) && saved.r.length) {
              return PaintRecordCodec.decode(saved.r);
            }
          } catch (_unused) {/* corrupted — treat as empty */}
          return [];
        };
        StorageService.hasPaintRecord = function hasPaintRecord(levelId) {
          return !!sys.localStorage.getItem(RECORD_PREFIX + levelId);
        }

        /* ── 关卡完成 ── */;
        StorageService.markLevelDone = function markLevelDone(levelId) {
          var list = this._loadDoneList();
          if (list.includes(levelId)) return;
          list.push(levelId);
          sys.localStorage.setItem(DONE_KEY, JSON.stringify(list));
        };
        StorageService.isLevelDone = function isLevelDone(levelId) {
          return this._loadDoneList().includes(levelId);
        };
        StorageService._loadDoneList = function _loadDoneList() {
          var raw = sys.localStorage.getItem(DONE_KEY);
          if (!raw) return [];
          try {
            var list = JSON.parse(raw);
            return Array.isArray(list) ? list : [];
          } catch (_unused2) {
            return [];
          }
        }

        /* ── 道具次数（全局） ── */;
        StorageService.loadToolCounts = function loadToolCounts() {
          var map = new Map();
          var raw = sys.localStorage.getItem(TOOL_KEY);
          if (!raw) return map;
          try {
            var obj = JSON.parse(raw);
            for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
              var k = _Object$keys[_i];
              map.set(Number(k), obj[k]);
            }
          } catch (_unused3) {/* corrupted */}
          return map;
        };
        StorageService.saveToolCounts = function saveToolCounts(counts) {
          var obj = {};
          counts.forEach(function (v, k) {
            obj[String(k)] = v;
          });
          sys.localStorage.setItem(TOOL_KEY, JSON.stringify(obj));
        };
        return StorageService;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Toast.ts", ['cc'], function (exports) {
  var cclegacy, view, Node, UITransform, Sprite, Color, Label, UIOpacity, tween, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Color = module.Color;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      exports('showToast', showToast);
      cclegacy._RF.push({}, "63ecciF/RtLCL7YOcOVsaDm", "Toast", undefined);
      var FONT_SIZE = 26;
      var PAD_H = 24;
      var PAD_V = 14;
      var RISE_PX = 40;
      var FADE_DELAY = 0.8;
      var FADE_DURATION = 0.8;
      var TOTAL_DURATION = FADE_DELAY + FADE_DURATION;
      function showToast(parent, msg) {
        var vs = view.getVisibleSize();
        var textW = msg.length * FONT_SIZE * 0.65;
        var bgW = textW + PAD_H * 2;
        var bgH = FONT_SIZE + PAD_V * 2;
        var startY = -vs.height / 2 + 160;
        var node = new Node('Toast');
        parent.addChild(node);
        node.setPosition(0, startY, 0);
        node.addComponent(UITransform).setContentSize(bgW, bgH);
        var bgNode = new Node('Bg');
        node.addChild(bgNode);
        bgNode.addComponent(UITransform).setContentSize(bgW, bgH);
        var bgSp = bgNode.addComponent(Sprite);
        bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
        bgSp.color = new Color(50, 50, 50, 200);
        var labNode = new Node('Label');
        node.addChild(labNode);
        labNode.addComponent(UITransform).setContentSize(bgW, bgH);
        var lab = labNode.addComponent(Label);
        lab.string = msg;
        lab.fontSize = FONT_SIZE;
        lab.horizontalAlign = Label.HorizontalAlign.CENTER;
        lab.verticalAlign = Label.VerticalAlign.CENTER;
        lab.color = Color.WHITE;
        var uiOp = node.addComponent(UIOpacity);
        uiOp.opacity = 255;
        tween(node).to(TOTAL_DURATION, {
          position: new Vec3(0, startY + RISE_PX, 0)
        }).start();
        tween(uiOp).delay(FADE_DELAY).to(FADE_DURATION, {
          opacity: 0
        }).call(function () {
          return node.destroy();
        }).start();
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToolConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39ba5jVIKpKPJs6zIwAAazi", "ToolConfig", undefined);
      var ToolType = exports('ToolType', /*#__PURE__*/function (ToolType) {
        ToolType[ToolType["None"] = 0] = "None";
        ToolType[ToolType["MagicWand"] = 1] = "MagicWand";
        ToolType[ToolType["Bomb"] = 2] = "Bomb";
        ToolType[ToolType["Magnifier"] = 3] = "Magnifier";
        return ToolType;
      }({}));
      var ToolTriggerMode = exports('ToolTriggerMode', /*#__PURE__*/function (ToolTriggerMode) {
        ToolTriggerMode[ToolTriggerMode["ClickToolThenCell"] = 0] = "ClickToolThenCell";
        ToolTriggerMode[ToolTriggerMode["ClickTool"] = 1] = "ClickTool";
        return ToolTriggerMode;
      }({}));
      var ToolDefs = exports('ToolDefs', [{
        type: ToolType.MagicWand,
        name: '魔术棒',
        triggerMode: ToolTriggerMode.ClickToolThenCell,
        initCount: 5
      }, {
        type: ToolType.Bomb,
        name: '炸弹',
        triggerMode: ToolTriggerMode.ClickToolThenCell,
        initCount: 5
      }, {
        type: ToolType.Magnifier,
        name: '放大镜',
        triggerMode: ToolTriggerMode.ClickTool,
        initCount: 5
      }]);
      var ToolParams = exports('ToolParams', {
        bombDiameter: 11,
        magnifierZoomDuration: 0.4,
        magnifierBlinkCount: 3,
        magnifierBlinkInterval: 0.2
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToolExecutor.ts", ['cc', './ToolConfig.ts', './FloodFill.ts'], function (exports) {
  var cclegacy, ToolParams, floodFill;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ToolParams = module.ToolParams;
    }, function (module) {
      floodFill = module.floodFill;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d3358kLM5VGzIhm5n4aG66s", "ToolExecutor", undefined);
      var ToolExecutor = exports('ToolExecutor', /*#__PURE__*/function () {
        function ToolExecutor() {}
        /**
         * 魔术棒：从 (row,col) FloodFill 同色相邻未填格，用正确颜色批量涂色。
         */
        ToolExecutor.magicWand = function magicWand(row, col, boardData, isFilled) {
          var brushIdx = boardData.getBrushIndex(row, col);
          if (brushIdx < 0) return [];
          if (isFilled(row, col)) return [];
          return floodFill(row, col, brushIdx, boardData, isFilled);
        }

        /**
         * 炸弹：以 (row,col) 为圆心，bombDiameter 为直径的圆内，
         * 所有未填充非透明格子用正确颜色涂上。
         */;
        ToolExecutor.bomb = function bomb(row, col, boardData, isFilled) {
          if (isFilled(row, col)) return [];
          var radius = ToolParams.bombDiameter * 0.5;
          var r2 = radius * radius;
          var half = Math.ceil(radius);
          var rows = boardData.gridRows;
          var cols = boardData.gridCols;
          var rMin = Math.max(0, row - half);
          var rMax = Math.min(rows - 1, row + half);
          var cMin = Math.max(0, col - half);
          var cMax = Math.min(cols - 1, col + half);
          var pending = [];
          for (var r = rMin; r <= rMax; r++) {
            var dr = r - row;
            for (var c = cMin; c <= cMax; c++) {
              var dc = c - col;
              if (dr * dr + dc * dc > r2) continue;
              if (isFilled(r, c)) continue;
              var bi = boardData.getBrushIndex(r, c);
              if (bi < 0) continue;
              pending.push({
                row: r,
                col: c,
                brushIndex: bi
              });
            }
          }
          return pending;
        }

        /**
         * 放大镜：找当前 brushIndex 对应的第一个未涂连通区域。
         * 从上到下、左到右扫描 → FloodFill 扩展。
         * 若当前色已全涂完，返回空（调用方负责自动切画笔）。
         */;
        ToolExecutor.magnifierFind = function magnifierFind(brushIndex, boardData, isFilled) {
          var rows = boardData.gridRows;
          var cols = boardData.gridCols;
          for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
              if (boardData.getBrushIndex(r, c) !== brushIndex) continue;
              if (isFilled(r, c)) continue;
              return floodFill(r, c, brushIndex, boardData, isFilled);
            }
          }
          return [];
        };
        return ToolExecutor;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToolPanel.ts", ['cc', './ToolConfig.ts'], function (exports) {
  var cclegacy, Color, Node, view, UITransform, Sprite, Label, ToolType, ToolDefs;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Node = module.Node;
      view = module.view;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Label = module.Label;
    }, function (module) {
      ToolType = module.ToolType;
      ToolDefs = module.ToolDefs;
    }],
    execute: function () {
      var _TOOL_COLORS;
      cclegacy._RF.push({}, "85e5dtvTfxN8agnIGY0DYmd", "ToolPanel", undefined);
      var TOOL_SIZE = 120;
      var TOOL_GAP = 40;
      var BADGE_SIZE = 36;
      var TOOL_COLORS = (_TOOL_COLORS = {}, _TOOL_COLORS[ToolType.MagicWand] = new Color(156, 39, 176, 255), _TOOL_COLORS[ToolType.Bomb] = new Color(244, 67, 54, 255), _TOOL_COLORS[ToolType.Magnifier] = new Color(33, 150, 243, 255), _TOOL_COLORS);
      /**
       * 道具面板：纯视觉 + hitTest，不含 Button / 触摸监听。
       * 点击判定由 PaletteInstaller 统一处理。
       */
      var ToolPanel = exports('ToolPanel', /*#__PURE__*/function () {
        function ToolPanel() {}
        ToolPanel.create = function create(toolState, itemSprite, barH) {
          var root = new Node('ToolPanel');
          var viewW = view.getVisibleSize().width;
          root.addComponent(UITransform).setContentSize(viewW, barH);
          var totalW = ToolDefs.length * TOOL_SIZE + (ToolDefs.length - 1) * TOOL_GAP;
          var startX = -totalW / 2 + TOOL_SIZE / 2;
          var items = [];
          for (var i = 0; i < ToolDefs.length; i++) {
            var _TOOL_COLORS$def$type;
            var def = ToolDefs[i];
            var x = startX + i * (TOOL_SIZE + TOOL_GAP);
            var item = new Node("Tool_" + def.name);
            root.addChild(item);
            item.setPosition(x, 0, 0);
            item.addComponent(UITransform).setContentSize(TOOL_SIZE + 16, TOOL_SIZE + 16);
            var ring = new Node('Ring');
            item.addChild(ring);
            ring.addComponent(UITransform).setContentSize(TOOL_SIZE + 12, TOOL_SIZE + 12);
            var ringSp = ring.addComponent(Sprite);
            ringSp.sizeMode = Sprite.SizeMode.CUSTOM;
            ringSp.spriteFrame = itemSprite;
            ringSp.color = new Color(255, 193, 7, 255);
            ring.active = false;
            var bg = new Node('Bg');
            item.addChild(bg);
            bg.addComponent(UITransform).setContentSize(TOOL_SIZE, TOOL_SIZE);
            var bgSp = bg.addComponent(Sprite);
            bgSp.sizeMode = Sprite.SizeMode.CUSTOM;
            bgSp.spriteFrame = itemSprite;
            bgSp.color = ((_TOOL_COLORS$def$type = TOOL_COLORS[def.type]) != null ? _TOOL_COLORS$def$type : new Color(100, 100, 100, 255)).clone();
            var labNode = new Node('Label');
            item.addChild(labNode);
            labNode.addComponent(UITransform).setContentSize(TOOL_SIZE, TOOL_SIZE);
            var lab = labNode.addComponent(Label);
            lab.string = def.name;
            lab.fontSize = 22;
            lab.horizontalAlign = Label.HorizontalAlign.CENTER;
            lab.verticalAlign = Label.VerticalAlign.CENTER;
            lab.color = Color.WHITE;
            var badge = this._createBadge(item, toolState.getCount(def.type));
            items.push({
              node: item,
              badgeLabel: badge,
              ringNode: ring,
              type: def.type
            });
          }
          toolState.onChanged = function () {
            for (var _i = 0; _i < ToolDefs.length; _i++) {
              var _TOOL_COLORS$_def$typ;
              var _def = ToolDefs[_i];
              var it = items[_i];
              var count = toolState.getCount(_def.type);
              it.badgeLabel.string = String(count);
              var _bg = it.node.getChildByName('Bg').getComponent(Sprite);
              _bg.color = count <= 0 ? new Color(180, 180, 180, 255) : ((_TOOL_COLORS$_def$typ = TOOL_COLORS[_def.type]) != null ? _TOOL_COLORS$_def$typ : new Color(100, 100, 100, 255)).clone();
              it.ringNode.active = toolState.activeType === _def.type;
            }
          };
          var hitTest = function hitTest(localX, localY) {
            for (var _i2 = 0, _items = items; _i2 < _items.length; _i2++) {
              var it = _items[_i2];
              var p = it.node.position;
              var ut = it.node.getComponent(UITransform);
              var hw = ut.width * 0.5;
              var hh = ut.height * 0.5;
              if (localX >= p.x - hw && localX <= p.x + hw && localY >= p.y - hh && localY <= p.y + hh) {
                return it.type;
              }
            }
            return ToolType.None;
          };
          return {
            node: root,
            hitTest: hitTest
          };
        };
        ToolPanel._createBadge = function _createBadge(parent, count) {
          var badge = new Node('Badge');
          parent.addChild(badge);
          badge.setPosition(TOOL_SIZE / 2 - 4, TOOL_SIZE / 2 - 4, 0);
          badge.addComponent(UITransform).setContentSize(BADGE_SIZE, BADGE_SIZE);
          var sp = badge.addComponent(Sprite);
          sp.sizeMode = Sprite.SizeMode.CUSTOM;
          sp.color = new Color(244, 67, 54, 255);
          var labNode = new Node('Num');
          badge.addChild(labNode);
          labNode.addComponent(UITransform).setContentSize(BADGE_SIZE, BADGE_SIZE);
          var lab = labNode.addComponent(Label);
          lab.string = String(count);
          lab.fontSize = 20;
          lab.horizontalAlign = Label.HorizontalAlign.CENTER;
          lab.verticalAlign = Label.VerticalAlign.CENTER;
          lab.color = Color.WHITE;
          return lab;
        };
        return ToolPanel;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToolState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ToolConfig.ts', './StorageService.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, ToolType, ToolDefs, StorageService;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ToolType = module.ToolType;
      ToolDefs = module.ToolDefs;
    }, function (module) {
      StorageService = module.StorageService;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c017eYZuxZOhZO0OOvy9S4p", "ToolState", undefined);

      /**
       * 全局道具状态：次数持久化 + 当前激活道具。
       * 由 AppRoot 创建一次，跨关卡复用；每关开始时 resetActive()。
       */
      var ToolState = exports('ToolState', /*#__PURE__*/function () {
        function ToolState() {
          this.activeType = ToolType.None;
          this._counts = void 0;
          this.onChanged = null;
          this._counts = new Map();
          var saved = StorageService.loadToolCounts();
          for (var _iterator = _createForOfIteratorHelperLoose(ToolDefs), _step; !(_step = _iterator()).done;) {
            var _saved$get;
            var def = _step.value;
            this._counts.set(def.type, (_saved$get = saved.get(def.type)) != null ? _saved$get : def.initCount);
          }
        }
        var _proto = ToolState.prototype;
        _proto.getCount = function getCount(type) {
          var _this$_counts$get;
          return (_this$_counts$get = this._counts.get(type)) != null ? _this$_counts$get : 0;
        };
        _proto.consume = function consume(type) {
          var _this$onChanged;
          var c = this.getCount(type);
          if (c <= 0) return false;
          this._counts.set(type, c - 1);
          this._persist();
          (_this$onChanged = this.onChanged) == null || _this$onChanged.call(this);
          return true;
        };
        _proto.activate = function activate(type) {
          var _this$onChanged2;
          this.activeType = type;
          (_this$onChanged2 = this.onChanged) == null || _this$onChanged2.call(this);
        };
        _proto.deactivate = function deactivate() {
          var _this$onChanged3;
          this.activeType = ToolType.None;
          (_this$onChanged3 = this.onChanged) == null || _this$onChanged3.call(this);
        };
        _proto.resetActive = function resetActive() {
          this.activeType = ToolType.None;
        };
        _proto._persist = function _persist() {
          StorageService.saveToolCounts(this._counts);
        };
        return ToolState;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/types.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "522feS/uHNPHL/tfrWjfcxe", "types", undefined);
      /** 格子位置（行列坐标） */
      /** 格子画刷条目：标识某个格子及其对应的画笔索引 */
      /** 单次涂色记录（含匹配结果） */
      /** 谜题原始数据（从 JSON 加载） */
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewportController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts'], function (exports) {
  var _createClass, cclegacy, view, GameConfig;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
    }, function (module) {
      GameConfig = module.GameConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "99f0aDrZe9PvJrq9h5DD1+b", "ViewportController", undefined);
      /** Content 节点：scale + position；键盘缩放 / 双指捏合 / 平移 + 边界钳制 */
      var ViewportController = exports('ViewportController', /*#__PURE__*/function () {
        function ViewportController(content, opts) {
          this._scale = void 0;
          this._initialScale = void 0;
          this._panX = 0;
          this._panY = 0;
          this._content = void 0;
          this._opts = void 0;
          this._snap = null;
          this._content = content;
          this._opts = opts;
          var s = 1;
          if (opts.autoFitInitial) {
            s = Math.max(opts.minScale, Math.min(opts.maxScale, opts.minScale));
          } else {
            s = Math.max(opts.minScale, Math.min(opts.maxScale, 1));
          }
          this._initialScale = s;
          this._scale = s;
          this._clampPan();
          this._apply(false);
        }
        var _proto = ViewportController.prototype;
        _proto.zoomInStep = function zoomInStep() {
          this.setScale(this._scale + this._opts.zoomStep);
        };
        _proto.zoomOutStep = function zoomOutStep() {
          this.setScale(this._scale - this._opts.zoomStep);
        };
        _proto.zoomContinuous = function zoomContinuous(dt, direction) {
          if (dt <= 0) return;
          var f = 1 + direction * this._opts.zoomSpeedPerSecond * dt;
          this.setScale(this._scale * f);
        };
        _proto.setScale = function setScale(s) {
          this.cancelSnap();
          var v = Math.max(this._opts.minScale, Math.min(this._opts.maxScale, s));
          if (Math.abs(v - this._scale) < 1e-6) return;
          this._scale = v;
          this._clampPan();
          this._apply();
        }

        /**
         * 双指一步 — 弹性缩放：不硬夹 [min, max]，允许越界但带橡皮筋阻力。
         * 松手后由 snapBack() 缓动归位。
         */;
        _proto.applyPinchPanStep = function applyPinchPanStep(prevDist, curDist, prevMid, curMid) {
          if (prevDist < 1e-4 || curDist < 1e-4) return;
          this.cancelSnap();
          this._panX += curMid.x - prevMid.x;
          this._panY += curMid.y - prevMid.y;
          var ratio = curDist / prevDist;
          var newScale = this._scale * ratio;
          var min = this._opts.minScale;
          var max = this._opts.maxScale;
          var rf = GameConfig.viewportRubberBandFactor;
          if (newScale < min) {
            newScale = min - (min - newScale) * rf;
          } else if (newScale > max) {
            newScale = max + (newScale - max) * rf;
          }
          newScale = Math.max(min * 0.5, Math.min(max * 2, newScale));
          var fx = curMid.x;
          var fy = curMid.y;
          var lx = (fx - this._panX) / this._scale;
          var ly = (fy - this._panY) / this._scale;
          this._scale = newScale;
          this._panX = fx - newScale * lx;
          this._panY = fy - newScale * ly;
          this._apply();
        };
        _proto.panBy = function panBy(deltaX, deltaY) {
          this.cancelSnap();
          this._panX += deltaX;
          this._panY += deltaY;
          this._clampPan();
          this._apply();
        }

        /* ── snap-back 弹回 ── */;
        _proto.snapBack = function snapBack(duration) {
          if (duration === void 0) {
            duration = GameConfig.viewportSnapBackDuration;
          }
          var ts = Math.max(this._opts.minScale, Math.min(this._opts.maxScale, this._scale));
          var _this$_clampedPanForS = this._clampedPanForScale(ts),
            tpx = _this$_clampedPanForS[0],
            tpy = _this$_clampedPanForS[1];
          if (Math.abs(ts - this._scale) < 1e-6 && Math.abs(tpx - this._panX) < 1 && Math.abs(tpy - this._panY) < 1) {
            this._snap = null;
            this._clampPan();
            this._apply();
            return;
          }
          this._snap = {
            startS: this._scale,
            startPx: this._panX,
            startPy: this._panY,
            endS: ts,
            endPx: tpx,
            endPy: tpy,
            elapsed: 0,
            duration: duration
          };
        };
        _proto.snapTo = function snapTo(targetScale, targetPanX, targetPanY, duration) {
          this._snap = {
            startS: this._scale,
            startPx: this._panX,
            startPy: this._panY,
            endS: targetScale,
            endPx: targetPanX,
            endPy: targetPanY,
            elapsed: 0,
            duration: duration
          };
        };
        _proto.cancelSnap = function cancelSnap() {
          this._snap = null;
        }

        /** 由 Component.update 驱动；返回 true 表示正在弹回中（阻断其他输入） */;
        _proto.tickSnapBack = function tickSnapBack(dt) {
          var st = this._snap;
          if (!st) return false;
          st.elapsed = Math.min(st.elapsed + dt, st.duration);
          var t = st.elapsed / st.duration;
          t = t * (2 - t);
          this._scale = st.startS + (st.endS - st.startS) * t;
          this._panX = st.startPx + (st.endPx - st.startPx) * t;
          this._panY = st.startPy + (st.endPy - st.startPy) * t;
          this._apply();
          if (st.elapsed >= st.duration) this._snap = null;
          return true;
        }

        /* ── 内部 ── */;
        _proto._clampedPanForScale = function _clampedPanForScale(scale) {
          var vs = view.getVisibleSize();
          var P = this._opts.viewportPadding;
          var W = this._opts.boardWidthPx * scale;
          var H = this._opts.boardHeightPx * scale;
          var px = this._panX;
          var py = this._panY;
          if (W > vs.width) {
            var m = (W - vs.width) * 0.5 + P;
            px = Math.max(-m, Math.min(m, px));
          } else {
            px = 0;
          }
          if (H > vs.height) {
            var _m = (H - vs.height) * 0.5 + P;
            py = Math.max(-_m, Math.min(_m, py));
          } else {
            py = 0;
          }
          return [px, py];
        };
        _proto._clampPan = function _clampPan() {
          var _this$_clampedPanForS2 = this._clampedPanForScale(this._scale),
            px = _this$_clampedPanForS2[0],
            py = _this$_clampedPanForS2[1];
          this._panX = px;
          this._panY = py;
        };
        _proto._apply = function _apply(notifyScaleChanged) {
          if (notifyScaleChanged === void 0) {
            notifyScaleChanged = true;
          }
          this._content.setScale(this._scale, this._scale, 1);
          this._content.setPosition(this._panX, this._panY, 0);
          if (notifyScaleChanged) {
            var _this$_opts$onScaleCh, _this$_opts;
            (_this$_opts$onScaleCh = (_this$_opts = this._opts).onScaleChanged) == null || _this$_opts$onScaleCh.call(_this$_opts, this._scale);
          }
        };
        _createClass(ViewportController, [{
          key: "scale",
          get: function get() {
            return this._scale;
          }
        }, {
          key: "initialScale",
          get: function get() {
            return this._initialScale;
          }
        }, {
          key: "minScale",
          get: function get() {
            return this._opts.minScale;
          }
        }, {
          key: "maxScale",
          get: function get() {
            return this._opts.maxScale;
          }
        }]);
        return ViewportController;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WhitePixel.ts", ['cc'], function (exports) {
  var cclegacy, Texture2D, ImageAsset, SpriteFrame;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Texture2D = module.Texture2D;
      ImageAsset = module.ImageAsset;
      SpriteFrame = module.SpriteFrame;
    }],
    execute: function () {
      exports('getWhitePixelSF', getWhitePixelSF);
      cclegacy._RF.push({}, "0d050EIMxFDjoXJ1wijb8nc", "WhitePixel", undefined);
      var _cached = null;

      /**
       * 等价于 G15 whitePixel 贴图资源：2x2 纯白 Texture2D → SpriteFrame（单例缓存）。
       * 用于所有需要纯色矩形的 Sprite（设 sizeMode=CUSTOM + color 即可控制颜色/透明度）。
       */
      function getWhitePixelSF() {
        if (_cached) return _cached;
        var pixels = new Uint8Array(2 * 2 * 4).fill(255);
        var tex = new Texture2D();
        tex.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
        tex.image = new ImageAsset({
          _data: pixels,
          _compressed: false,
          width: 2,
          height: 2,
          format: Texture2D.PixelFormat.RGBA8888
        });
        var sf = new SpriteFrame();
        sf.texture = tex;
        _cached = sf;
        return sf;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ZoomFadeMath.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        nonSelectedBoardFadeAlpha: nonSelectedBoardFadeAlpha,
        quantizeZoomFadeAlpha: quantizeZoomFadeAlpha,
        smoothstep: smoothstep
      });
      cclegacy._RF.push({}, "a1c2eP0W21HiaASNFZ4mrze", "ZoomFadeMath", undefined);
      /** 与 G15_FBase_ZoomFadeLogic 一致：smoothstep + alpha 量化 */

      function smoothstep(edge0, edge1, x) {
        if (edge1 <= edge0) return 0;
        var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
        return t * t * (3 - 2 * t);
      }
      function quantizeZoomFadeAlpha(rawAlpha, steps) {
        return Math.round(rawAlpha * steps) / steps;
      }

      /** nonSelAlpha = 1 - (1 - α)²，再量化（盘面非选中格） */
      function nonSelectedBoardFadeAlpha(quantizedAlpha, steps) {
        var inv = 1 - quantizedAlpha;
        return quantizeZoomFadeAlpha(1 - inv * inv, steps);
      }
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});