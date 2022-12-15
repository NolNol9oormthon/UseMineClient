declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': any;
  }
}

declare namespace Object {
  interface ImageFile {
    file: any;
    imagePreviewUrl: any;
  }
}

interface IModalOverlay {
  visible: any;
}

interface IModalWrapper {
  onClick: any;
  visible: any;
}

interface IModal {
  className: any;
  onClose: any;
  maskClosable: any;
  visible: any;
  text: any;
  subText: any;
  buttonText: any;
  buttonOnClick: any;
}
