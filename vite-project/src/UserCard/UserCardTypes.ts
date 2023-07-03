export interface User {
    _id: string,
    name: Name;
    email: string;
    location: Location;
    image: string;
}

export interface Name {
    first: string;
    last: string;
}

export interface Location {
    city: string;
    country: string;
}
