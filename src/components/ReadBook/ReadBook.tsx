import {
  ScrollView,
  ModalBackdrop,
  ModalContent,
  ModalBody,
  Modal,
} from '@gluestack-ui/themed';
import WebView from 'react-native-webview';
import {ReadBookProps} from './types';

const ReadBook: React.FC<ReadBookProps> = ({
  refReadBook,
  setShowBook,
  showBook,
  isbn,
}) => {
  return (
    <ScrollView>
      <Modal
        size="lg"
        padding={0}
        isOpen={showBook}
        testID="modalEmbeddedBook"
        onClose={() => {
          setShowBook(false);
        }}
        finalFocusRef={refReadBook}>
        <ModalBackdrop />
        <ModalContent>
          <ModalBody marginTop={8}>
            <WebView
              originWhitelist={['*']}
              style={{width: 'auto', height: 500}}
              source={{
                html: `
                      <meta name="viewport" content="width=device-width">
                      <script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script>
                      <script type="text/javascript">
                        google.books.load();

                        function alertNotFound() {
                          alert("Buku tidak dapat dibaca!");
                        }

                        function initialize() {
                          var viewer = new google.books.DefaultViewer(
                            document.getElementById('viewerCanvas'),
                          );
                          viewer.load('ISBN:${isbn}', alertNotFound);
                        }

                        google.books.setOnLoadCallback(initialize);
                      </script>

                      <body>
                      <div id="viewerCanvas" style="width: 500px; height: 860px"></div>
                    </body>
                    `,
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
};

export default ReadBook;
