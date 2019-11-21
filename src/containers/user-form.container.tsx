import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { addUser, User } from '../store';
import { connect } from 'react-redux';
import axios, { AxiosResponse } from 'axios'

type Props = RouteComponentProps & typeof mapDispatchToProps;

enum sexEnum {
    male = 'male',
    female = 'female'
}

enum loyaltyProgramEnum {
    undefined = 'undefined',
    plasticCard = 'plastic-card',
    mobileApplication = 'mobile-application'
}

interface userFormState {
    firstName: string,
    lastName: string,
    sex: sexEnum | null,
    loyaltyProgram: loyaltyProgramEnum,
    card: string
}

interface validationErrors {
    firstName: boolean,
    lastName: boolean,
    sex: boolean,
    card: boolean,

}

interface fetchedData {
    data: string[]
}

const initialFormState: userFormState = {
    firstName: '',
    lastName: '',
    loyaltyProgram: loyaltyProgramEnum.undefined,
    sex: null,
    card: ''
}

const UserForm: React.FC<Props> = (props) => {
    const [message, setMessage] = React.useState();
    const [newUser, setUser] = React.useState<userFormState>(initialFormState);
    const [validationErrors, setError] = React.useState<validationErrors>({
        card: false,
        firstName: false,
        lastName: false,
        sex: false
    })

    const fetchData = async () => {
        const serverResponce = await axios.get<null, AxiosResponse<fetchedData>>('https://meowfacts.herokuapp.com/');
        setMessage(serverResponce.data.data[0])
    }

    const onFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...newUser, [name]: value })
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const onUserAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const key = Object.keys(validationErrors);

        key.forEach((key) => {
            switch (key) {
                case 'firstName': {
                    if (newUser[key].length !== 0) {
                        setError({ ...validationErrors, [key]: false });
                    } else { setError({ ...validationErrors, [key]: true }); }

                    break;
                }
                case 'lastName': {
                    if (newUser[key].length !== 0) {
                        setError({ ...validationErrors, [key]: false });
                    } else { setError({ ...validationErrors, [key]: true }); }
                    break;
                }
                case 'sex': {
                    if (newUser[key]) {
                        setError({ ...validationErrors, [key]: false });
                    } else { setError({ ...validationErrors, [key]: true }); }

                    break;
                }
                case 'card': {
                    if (newUser.loyaltyProgram === loyaltyProgramEnum.plasticCard || newUser[key].length !== 0) {
                        setError({ ...validationErrors, [key]: false });
                    } else { setError({ ...validationErrors, [key]: true }); }

                    break;
                }

                default: {
                    break;
                }
            }
        })
        const errors = Object.values(validationErrors);
        const isError = errors.some((value) => {
            return value === true
        })
        if (!isError) {
            const user: User = {
                fullName: newUser.firstName + ' ' + newUser.lastName,
                creationDate: new Date()
            }
            props.addUser(user);
        }
    }

    return (
        <form onSubmit={onUserAdd} className='userForm'>
            <label htmlFor='firstName'>First Name:</label>
            <input type="text" id='firstName' name='firstName' onChange={onFieldChange} />
            {validationErrors.firstName && <p className='errorMessage'>Validation Error</p>}


            <label htmlFor='lastName'>Last Name:</label>
            <input type="text" id='lastName' name='lastName' onChange={onFieldChange} />
            {validationErrors.lastName && <p className='errorMessage'>Validation Error</p>}

            <label>Sex:</label>
            <label title='sex' htmlFor='male'>Male</label>
            <input type="radio" id='male' name='sex' onChange={onFieldChange} value={sexEnum.male} />
            <label title='sex' htmlFor='female'>Female</label>
            <input type="radio" id='female' name='sex' onChange={onFieldChange} value={sexEnum.female} />
            {validationErrors.sex && <p className='errorMessage'>Validation Error</p>}

            <label htmlFor='loyaltyProgram'>Loyalty Program:</label>
            <select name='loyaltyProgram' id='loyaltyProgram' onChange={onFieldChange} value={newUser.loyaltyProgram}>
                <option>
                    {loyaltyProgramEnum.undefined}
                </option>
                <option>
                    {loyaltyProgramEnum.plasticCard}
                </option>
                <option>
                    {loyaltyProgramEnum.mobileApplication}
                </option>
            </select>
            {newUser.loyaltyProgram === loyaltyProgramEnum.plasticCard &&
                <div>
                    <label htmlFor='card'>Card:</label>
                    <input type="text" id='card' name='card' onChange={onFieldChange} />
                </div>}

            {validationErrors.card && <p className='errorMessage'>Validation Error</p>}
            <button>Add</button>
            <p>{message}</p>
        </form>
    )
}

const mapDispatchToProps = {
    addUser: addUser
}

export default connect(null, mapDispatchToProps)(UserForm)