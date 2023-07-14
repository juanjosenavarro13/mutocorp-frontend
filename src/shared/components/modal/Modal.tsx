import { useEffect, useState } from 'react';

type Props = {
  modalTitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  show?: boolean;
  onCloseModal?: () => void;
};

export default function Modal(props: Props) {
  const { modalTitle, children, footer, show, onCloseModal } = props;
  const [showModal, setShowModal] = useState(show ?? false);

  useEffect(() => {
    setShowModal(show ?? false);
  }, [show]);

  const closeModal = () => {
    if (onCloseModal) onCloseModal();
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-blue-700 dark:text-white">
                    {modalTitle}
                  </h3>
                  <button
                    className="border-0 text-blue-700 dark:text-white float-right"
                    onClick={() => closeModal()}
                  >
                    <span className="text-3xl pl-6">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto my-4 text-slate-500 text-lg leading-relaxed">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {footer}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
