"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeroiconsOutlineX } from "@/assets/icons";
import { LazyMap, LazyMarker } from "./MapComponent/index";

export default function SlideMenu({ data, toggle, onToggle }) {
  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onToggle}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-20 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-medium text-white">
                        Theater Location
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={onToggle}
                        >
                          <span className="sr-only">Close panel</span>
                          <HeroiconsOutlineX
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        The theater location is a vital aspect of any theatrical
                        experience. It sets the stage for the magic to unfold,
                        providing a physical space where stories come to life.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex-1 px-4 py-6 sm:px-6">
                    {/* Replace with your content */}
                    {/* <div className="absolute inset-0 px-4 py-6 sm:px-6">
                      <div
                        className="h-full border-2 border-dashed border-gray-200"
                        aria-hidden="true"
                      />
                    </div> */}
                    <LazyMap />
                    {/* <LazyMarker /> */}
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
