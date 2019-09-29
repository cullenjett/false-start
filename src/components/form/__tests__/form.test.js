import React from 'react';
import { render } from '@testing-library/react';

import Form from '../form';
import Field from '../field';
import InputField from '../../inputs/input-field';

describe('<Form />', () => {
  it('renders a basic form', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()} validate={jest.fn(() => ({}))}>
        {() => (
          <Field
            label="First name"
            name="firstName"
            type="text"
            component={InputField}
          />
        )}
      </Form>
    );

    expect(container).toMatchSnapshot();
  });
});
