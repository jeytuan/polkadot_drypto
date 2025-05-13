#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod my_contract {
    #[ink(storage)]
    pub struct MyContract {
        value: bool,
    }

    impl MyContract {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}