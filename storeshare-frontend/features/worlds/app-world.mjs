// adapated from https://charles-stover.medium.com/behavior-driven-react-development-with-cucumber-faf596d9d71b

import {
    RenderResult,
    SelectorMatcherOptions,
    act,
    render,
    fireEvent,
} from '@testing-library/react/pure';

import { World } from '@cucumber/cucumber';
import { Location } from 'history';
import React, { ComponentType, PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
// import useReactRouter from 'use-react-router';

import App from '../../src/App.js';
import { setDefaultHost } from '../../src/utils/ApiCaller.js';

// interface WorldParams {
//     attach(
//         content: Buffer | string,
//         mimeType?: string,
//         callback?: () => void,
//     ): void;
//     parameters: Record<string, unknown>;
// }

export class AppWorld {
    // _location = {
    //     hash: '',
    //     pathname: '/',
    //     search: '',
    //     state: {},
    // };

    _location;

    _result = null;
    _route = '/';

    attach;
    parameters;

    constructor({ attach, parameters }) {
        this._RouterSpy = this._RouterSpy.bind(this);
        this.click = this.click.bind(this);
        this.getButtonByText = this.getButtonByText.bind(this);
        this.getButtonByAria = this.getButtonByAria.bind(this);
        this.getByText = this.getByText.bind(this);
        this.getByTextContent = this.getByTextContent.bind(this); 
        this.setValue = this.setValue.bind(this);
        this.render = this.render.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.attach = attach;
        this.parameters = parameters;

        setDefaultHost('http://localhost:8080'); 
    }

    _RouterSpy({
        children,
    }) {
        const location = useLocation();
        if (this._location !== location) {
            this._location = location;
        }
        return <>{ children }</>;
    }

    get result() {
        if (this._result) {
            return this._result;
        }
        this._result = this.render();
        return this._result;
    }

    click(element) {
        act(() => {
            element.click();
        });
    }

    getButtonByAria(label) {
        return this.getByAria(
            label,
            {},
        );
    }

    getButtonByText(text) {
        return this.getByText(
            text,
            { selector: 'button' },
        );
    }

    // https://testing-library.com/docs/react-testing-library/cheatsheet/
    getByText(
        text,
        options,
    ) {
        return this.result.getByText(text, options);
    }

    // https://stackoverflow.com/questions/68209510/how-to-access-text-broken-by-multiple-elements-in-testing-library
    getByTextContent = (text) => {
        // Passing function to `getByText`
        return this.result.getAllByText((content, element) => {
            const hasText = element => element.textContent === text
            const elementHasText = hasText(element)
            const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child))
            return elementHasText && childrenDontHaveText
      })
    }

    getByAria(
        label,
        options,
    ) {
        return this.result.getByLabelText(label, options);
    }

    setValue(
        element,
        value
    ) {
        fireEvent.change(element, {target: {value: value}})
    }

    get location() {
        return this._location;
    }

    get route() {
        return (
            this._location.pathname +
            this._location.search +
            this._location.hash
        );
    }

    setRoute(route) {
        this._route = route;
    }

    render() {
        const route = this._route;
        const RouterSpy =
            this._RouterSpy;
        return render(
            <App />,
            {
                wrapper({ children }) {
                    return (
                        <MemoryRouter initialEntries={[route]} initialIndex={0}>
                            <RouterSpy>
                                {children}
                            </RouterSpy>
                        </MemoryRouter>
                    );
                },
            },
        );
    }
}