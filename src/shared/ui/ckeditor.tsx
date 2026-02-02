// components/CKEditorComponent.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Autoformat,
  TextTransformation,
  LinkImage,
  Link,
  ImageBlock,
  ImageToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CloudServices,
  ImageUpload,
  ImageInsert,
  ImageInsertViaUrl,
  AutoImage,
  PictureEditing,
  CKBoxImageEdit,
  TableColumnResize,
  Table,
  TableToolbar,
  Emoji,
  Mention,
  Heading,
  ImageTextAlternative,
  ImageCaption,
  ImageResize,
  ImageStyle,
  Indent,
  IndentBlock,
  ImageInline,
  Italic,
  ListProperties,
  List,
  MediaEmbed,
  PasteFromOffice,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TodoList,
  Underline,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Alignment,
  GeneralHtmlSupport,
  HorizontalLine,
  SpecialCharactersArrows,
  SpecialCharacters,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText
} from 'ckeditor5';
import { SourceEditingEnhanced, ExportPdf } from 'ckeditor5-premium-features';

// Import CSS - đảm bảo bạn đã cài đặt packages
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Njk0NzE5OTksImp0aSI6ImVkZGY5YjQ3LWY2Y2QtNGNlMi04ZjRlLTU5OWY4ZWNmNjliOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjdlYTZjNWJiIn0.oNWUz3wVYD6eieBX6YR1wV-ANriZ_W58qcU4yOqfxW-yJmMfYf1rBRK_0Mb160pQty7qN6tbBtO0vRxN2AZnMA';

const CLOUD_SERVICES_TOKEN_URL =
  'https://4ocpaldwvurw.cke-cs.com/token/dev/28fef18dd0e3bf521e9996349cf4812cbbe65e5b353bc08300f6d1dc9f06?limit=10';

interface CKEditorComponentProps {
  initialData?: string;
  onChange?: (data: string) => void;
  onReady?: (editor: any) => void;
  placeholder?: string;
  className?: string;
}

export default function CKEditorComponent({
  initialData = '',
  onChange,
  onReady,
  placeholder = 'Type or paste your content here!',
  className = ''
}: CKEditorComponentProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'sourceEditingEnhanced',
            'exportPdf',
            '|',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'emoji',
            'specialCharacters',
            'horizontalLine',
            'link',
            'insertImage',
            'ckbox',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          Autosave,
          BlockQuote,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Emoji,
          Essentials,
          ExportPdf,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Mention,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          SourceEditingEnhanced,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL
        },
        exportPdf: {
          stylesheets: [
            'https://cdn.ckeditor.com/ckeditor5/47.3.0/ckeditor5.css',
            'https://cdn.ckeditor.com/ckeditor5-premium-features/47.3.0/ckeditor5-premium-features.css'
          ],
          fileName: 'export-pdf-demo.pdf',
          converterOptions: {
            format: 'Tabloid',
            margin_top: '20mm',
            margin_bottom: '20mm',
            margin_right: '24mm',
            margin_left: '24mm',
            page_orientation: 'portrait'
          }
        },
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
            '|',
            'ckboxImageEdit'
          ]
        },
        initialData: initialData,
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        mention: {
          feeds: [
            {
              marker: '@',
              feed: []
            }
          ]
        },
        placeholder: placeholder,
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties'
          ]
        }
      }
    };
  }, [isLayoutReady, initialData, placeholder]);

  return (
    <div className={`main-container ${className}`}>
      <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                onReady={(editor) => {
                  editorRef.current = editor;
                  onReady?.(editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange?.(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}