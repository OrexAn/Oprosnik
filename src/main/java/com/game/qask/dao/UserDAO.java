package com.game.qask.dao;

import com.game.qask.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * интерфейс DAO слоя, который определяет какие именно запросы можно отправлять к источнику данных
 */
public interface UserDAO extends JpaRepository<User, Long>{

    /*@Modifying //It can be useful
    @Query("update Person u set u.role = :role where u.id = :id")
    Person customUpdateRoleById(@Param("id") Long id, @Param("role") String role);*/

    Optional<User> findUsersByUserName(@Param("name") String name);

    Optional<User> findUserByEmail(@Param("email") String email);

}
