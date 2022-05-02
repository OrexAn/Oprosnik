package com.game.qask.services;

import com.game.qask.dao.UserDAO;
import com.game.qask.model.User;
import com.game.qask.view.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * сервис по сути делает некоторые манипуляции с воходными данными (запросами к "базе") и делает запрос к DAO слою
 * после чего возвращает требуемые данные
 */
@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User addNewUser(User user){
        return userDAO.save(user);
    }
    public List<User> getAllUsers(){
        return userDAO.findAll();
    }
    public Optional<User> getUserById(Long id){
        return userDAO.findById(id);
    }
    public Optional<User> getUserByUserName(String name){
        return userDAO.findUsersByUserName(name);
    }

    public Optional<User> getUserByEmail(String email){
        return userDAO.findUserByEmail(email);
    }
    public boolean deleteUserById(Long id) {
        userDAO.deleteById(id);
        if(!userDAO.existsById(id)){
            return true;
        }
        return false;
    }
    public Optional<User> updateUserById(Long id, User newUser) {
        User oldUser = userDAO.findById(id).orElse(null);
        if(oldUser == null){
            return Optional.empty();
        }
        oldUser.setAuthority(newUser.getAuthority());
        oldUser.setAvatar(newUser.getAvatar());
        return Optional.ofNullable(userDAO.save(oldUser));
    }

    public Map<String, Map<String, String>> getUserVOArrayView(ArrayList<UserVO> usersVO){

        HashMap<String, Map<String, String>> usersVOResult = new LinkedHashMap<>();
        for(int i = 0; i < usersVO.size(); i++){
            usersVOResult.put(String.valueOf(i), usersVO.get(i).getMapParameters());
        }
        return usersVOResult;
    }
}
